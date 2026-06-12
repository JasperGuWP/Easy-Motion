const fs = require("node:fs");
const path = require("node:path");
const { getConfigDir } = require("../utils/paths");
const { readJsonFile } = require("./file-service");

let dbInstance = null;
let dbDisabled = false;

function getLibraryDbPath() {
  return path.join(getConfigDir(), "library.db");
}

function getDb() {
  if (dbDisabled) return null;
  if (dbInstance) return dbInstance;

  try {
    const Database = require("better-sqlite3");
    const dbPath = getLibraryDbPath();
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    dbInstance = new Database(dbPath);
    dbInstance.pragma("journal_mode = WAL");
    initSchema(dbInstance);
    return dbInstance;
  } catch (error) {
    dbDisabled = true;
    dbInstance = null;
    console.warn("[asset-db] SQLite unavailable, falling back to manifest only:", error.message);
    return null;
  }
}

function initSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version INTEGER PRIMARY KEY,
      applied_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS assets (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      name TEXT NOT NULL,
      original_name TEXT,
      type TEXT NOT NULL,
      mime_type TEXT,
      path TEXT NOT NULL,
      public_path TEXT NOT NULL,
      content_hash TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      width INTEGER,
      height INTEGER,
      duration_in_frames INTEGER,
      is_deleted INTEGER DEFAULT 0,
      imported_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_assets_project ON assets(project_id);
    CREATE INDEX IF NOT EXISTS idx_assets_content_hash ON assets(project_id, content_hash);
    CREATE INDEX IF NOT EXISTS idx_assets_deleted ON assets(is_deleted);
  `);

  const row = db.prepare("SELECT MAX(version) AS v FROM schema_migrations").get();
  if (!row?.v) {
    db.prepare("INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?)").run(
      1,
      Date.now(),
    );
  }
}

function resolveProjectId(projectRoot) {
  const crypto = require("node:crypto");
  const pathHash = crypto
    .createHash("sha256")
    .update(path.resolve(projectRoot))
    .digest("hex")
    .slice(0, 32);

  const projectJsonPath = path.join(projectRoot, "project.json");
  if (fs.existsSync(projectJsonPath)) {
    try {
      const project = readJsonFile(projectJsonPath);
      if (project.id) return String(project.id);
    } catch {
      /* use path hash */
    }
  }

  return `proj-${pathHash}`;
}

function dbRowToProjectAsset(row) {
  return {
    id: row.id,
    name: row.name,
    originalName: row.original_name ?? row.name,
    type: row.type,
    mimeType: row.mime_type ?? "application/octet-stream",
    path: row.path,
    publicPath: row.public_path,
    width: row.width ?? undefined,
    height: row.height ?? undefined,
    durationInFrames: row.duration_in_frames ?? undefined,
    importedAt: row.imported_at,
    isDeleted: Boolean(row.is_deleted),
    contentHash: row.content_hash,
  };
}

function projectAssetToDbRow(projectId, asset) {
  return {
    id: asset.id,
    project_id: projectId,
    name: asset.name,
    original_name: asset.originalName ?? asset.name,
    type: asset.type,
    mime_type: asset.mimeType ?? null,
    path: asset.path,
    public_path: asset.publicPath,
    content_hash: asset.contentHash ?? "",
    size_bytes: asset.sizeBytes ?? 0,
    width: asset.width ?? null,
    height: asset.height ?? null,
    duration_in_frames: asset.durationInFrames ?? null,
    is_deleted: asset.isDeleted ? 1 : 0,
    imported_at: asset.importedAt ?? Date.now(),
  };
}

function upsertAsset(projectRoot, asset, contentHash, sizeBytes) {
  const db = getDb();
  if (!db) return;

  const projectId = resolveProjectId(projectRoot);
  const row = projectAssetToDbRow(projectId, {
    ...asset,
    contentHash,
    sizeBytes,
  });

  db.prepare(`
    INSERT INTO assets (
      id, project_id, name, original_name, type, mime_type, path, public_path,
      content_hash, size_bytes, width, height, duration_in_frames,
      is_deleted, imported_at
    ) VALUES (
      @id, @project_id, @name, @original_name, @type, @mime_type, @path, @public_path,
      @content_hash, @size_bytes, @width, @height, @duration_in_frames,
      @is_deleted, @imported_at
    )
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      original_name = excluded.original_name,
      type = excluded.type,
      mime_type = excluded.mime_type,
      path = excluded.path,
      public_path = excluded.public_path,
      content_hash = excluded.content_hash,
      size_bytes = excluded.size_bytes,
      width = excluded.width,
      height = excluded.height,
      duration_in_frames = excluded.duration_in_frames,
      is_deleted = excluded.is_deleted,
      imported_at = excluded.imported_at
  `).run(row);
}

function findByContentHash(projectRoot, contentHash) {
  const db = getDb();
  if (!db || !contentHash) return null;

  const projectId = resolveProjectId(projectRoot);
  const row = db
    .prepare(
      `SELECT * FROM assets
       WHERE project_id = ? AND content_hash = ? AND is_deleted = 0
       LIMIT 1`,
    )
    .get(projectId, contentHash);

  return row ? dbRowToProjectAsset(row) : null;
}

function listAssetsFromDb(projectRoot) {
  const db = getDb();
  if (!db) return null;

  const projectId = resolveProjectId(projectRoot);
  const rows = db
    .prepare(
      `SELECT * FROM assets
       WHERE project_id = ? AND is_deleted = 0
       ORDER BY imported_at DESC`,
    )
    .all(projectId);

  return rows.map(dbRowToProjectAsset);
}

function markAssetDeleted(projectRoot, assetId) {
  const db = getDb();
  if (!db) return;

  const projectId = resolveProjectId(projectRoot);
  db.prepare(
    `UPDATE assets SET is_deleted = 1
     WHERE id = ? AND project_id = ?`,
  ).run(assetId, projectId);
}

function syncManifestToDb(projectRoot, manifestAssets) {
  const db = getDb();
  if (!db) return;

  for (const asset of manifestAssets) {
    if (!asset.id || !asset.path) continue;
    const absolute = path.join(projectRoot, ...asset.path.split("/"));
    let contentHash = asset.contentHash ?? "";
    let sizeBytes = asset.sizeBytes ?? 0;
    if (!contentHash && fs.existsSync(absolute)) {
      try {
        const { hashFileSync } = require("./asset-hash");
        contentHash = hashFileSync(absolute);
        sizeBytes = fs.statSync(absolute).size;
      } catch {
        contentHash = "";
      }
    }
    upsertAsset(projectRoot, asset, contentHash, sizeBytes);
  }
}

function isDbEnabled() {
  return Boolean(getDb());
}

module.exports = {
  getLibraryDbPath,
  resolveProjectId,
  isDbEnabled,
  upsertAsset,
  findByContentHash,
  listAssetsFromDb,
  markAssetDeleted,
  syncManifestToDb,
  dbRowToProjectAsset,
};
