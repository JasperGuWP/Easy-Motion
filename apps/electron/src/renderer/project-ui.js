const statusEl = document.getElementById("status");
const currentEl = document.getElementById("current");
const recentListEl = document.getElementById("recentList");

function setStatus(text, isError = false) {
  statusEl.textContent = text;
  statusEl.className = isError ? "error" : "";
}
window.setStatus = setStatus;

function formatTime(ts) {
  if (!ts) return "-";
  return new Date(ts).toLocaleString();
}

async function refreshRecent() {
  const res = await window.easyMotion.project.listRecent();
  if (!res.success) {
    setStatus(res.error?.message || "加载最近项目失败", true);
    return;
  }

  recentListEl.innerHTML = "";
  for (const item of res.data) {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <div><strong>${item.name}</strong></div>
        <div class="path">${item.path}</div>
        <div class="path">修改时间：${formatTime(item.modifiedAt)}</div>
      </div>
      <div class="row">
        <button data-open="${item.path}">打开</button>
        <button data-delete="${item.path}">删除</button>
      </div>
    `;
    recentListEl.appendChild(li);
  }

  recentListEl.querySelectorAll("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => openProject(btn.dataset.open));
  });
  recentListEl.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", () => deleteProject(btn.dataset.delete));
  });
}

async function refreshCurrent() {
  const res = await window.easyMotion.project.getCurrent();
  if (!res.success || !res.data) {
    currentEl.textContent = "未打开项目";
    return;
  }
  const p = res.data.data;
  currentEl.textContent = `${p.name} | ${res.data.path}`;
}

async function createProject() {
  const name = document.getElementById("projectName").value.trim();
  const parentPath = document.getElementById("parentPath").value.trim() || undefined;
  const res = await window.easyMotion.project.create({ name, parentPath });
  if (!res.success) {
    setStatus(res.error?.message || "创建失败", true);
    return;
  }
  setStatus(`创建成功：${res.data.path}`);
  await refreshRecent();
  await refreshCurrent();
}

async function openProject(path) {
  const res = await window.easyMotion.project.open(path);
  if (!res.success) {
    setStatus(res.error?.message || "打开失败", true);
    return;
  }
  setStatus(`已打开：${res.data.project.name}`);
  await refreshRecent();
  await refreshCurrent();
}

async function saveProject() {
  const res = await window.easyMotion.project.save();
  if (!res.success) {
    setStatus(res.error?.message || "保存失败", true);
    return;
  }
  setStatus("保存成功");
  await refreshRecent();
}

async function deleteProject(path) {
  const ok = confirm(`确认删除项目？\n${path}`);
  if (!ok) return;
  const res = await window.easyMotion.project.delete(path);
  if (!res.success) {
    setStatus(res.error?.message || "删除失败", true);
    return;
  }
  setStatus("删除成功");
  await refreshRecent();
  await refreshCurrent();
}

document.getElementById("createBtn").addEventListener("click", createProject);
document.getElementById("saveBtn").addEventListener("click", saveProject);
document.getElementById("openBtn").addEventListener("click", async () => {
  const picked = await window.easyMotion.project.pickProjectDirectory();
  if (!picked.success || !picked.data?.path) return;
  await openProject(picked.data.path);
});
document.getElementById("pickParentBtn").addEventListener("click", async () => {
  const picked = await window.easyMotion.project.pickParentDirectory();
  if (!picked.success || !picked.data?.path) return;
  document.getElementById("parentPath").value = picked.data.path;
});

const timelinePreviewEl = document.getElementById("timelinePreview");

async function loadTimelinePreview() {
  const res = await window.easyMotion.timeline.load();
  if (!res.success) {
    setStatus(res.error?.message || "加载时间线失败", true);
    return;
  }
  timelinePreviewEl.textContent = JSON.stringify(res.data, null, 2);
  setStatus("时间线已加载");
}

document.getElementById("loadTimelineBtn").addEventListener("click", loadTimelinePreview);
document.getElementById("applySampleBtn").addEventListener("click", async () => {
  const res = await window.easyMotion.timeline.applySample();
  if (!res.success) {
    setStatus(res.error?.message || "写入示例失败", true);
    return;
  }
  timelinePreviewEl.textContent = JSON.stringify(res.data, null, 2);
  setStatus("示例时间线已写入 subproject.json");
});
document.getElementById("generateBtn").addEventListener("click", async () => {
  const res = await window.easyMotion.timeline.generate();
  if (!res.success) {
    setStatus(res.error?.message || "生成失败", true);
    return;
  }
  setStatus(`已生成：${res.data.files.join(", ")}`);
  if (res.data.previewReload && window.reloadPreviewAfterGenerate) {
    const tl = await window.easyMotion.timeline.load();
    if (tl.success) await window.reloadPreviewAfterGenerate(tl.data);
  }
});

// --- M3 预览 ---
const PREVIEW_CHANNEL = "easymotion-preview";
const previewFrameEl = document.getElementById("previewFrame");
const frameLabelEl = document.getElementById("frameLabel");
const seekInputEl = document.getElementById("seekInput");
const installLogEl = document.getElementById("installLog");
const previewStartBtn = document.getElementById("previewStartBtn");

function appendInstallLog(line) {
  if (!installLogEl) return;
  if (installLogEl.textContent.startsWith("安装/启动")) {
    installLogEl.textContent = "";
  }
  installLogEl.textContent += `${line}\n`;
  installLogEl.scrollTop = installLogEl.scrollHeight;
}

if (window.easyMotion?.preview?.onLog) {
  window.easyMotion.preview.onLog(({ line }) => appendInstallLog(line));
}

function postToPreview(message) {
  if (!previewFrameEl?.contentWindow) return;
  previewFrameEl.contentWindow.postMessage({ channel: PREVIEW_CHANNEL, ...message }, "*");
}

window.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.channel !== PREVIEW_CHANNEL) return;
  if (data.type === "FRAME_CHANGE" && frameLabelEl) {
    frameLabelEl.textContent = `帧 ${data.frame} / ${Number(seekInputEl?.max ?? 0)}`;
    if (seekInputEl) seekInputEl.value = String(data.frame);
  }
  if (data.type === "READY") setStatus("预览 Player 已就绪");
});

async function reloadPreviewAfterGenerate(timeline) {
  if (timeline && seekInputEl) {
    seekInputEl.max = String(Math.max(0, (timeline.durationInFrames ?? 90) - 1));
  }
  const state = await window.easyMotion.preview.getState();
  if (state.success && state.data?.status === "running" && state.data.url && previewFrameEl) {
    previewFrameEl.src = `${state.data.url.split("?")[0]}?t=${Date.now()}`;
    setStatus("预览已刷新");
  }
}
window.reloadPreviewAfterGenerate = reloadPreviewAfterGenerate;

async function startPreview() {
  if (!window.easyMotion?.preview?.start) {
    setStatus("预览模块未加载，请完全关闭后重新启动应用", true);
    return;
  }

  const current = await window.easyMotion.project.getCurrent();
  if (!current.success || !current.data?.path) {
    setStatus("请先创建或打开一个项目", true);
    appendInstallLog("错误：未打开项目");
    return;
  }

  if (previewStartBtn) {
    previewStartBtn.disabled = true;
    previewStartBtn.textContent = "启动中…";
  }
  if (installLogEl) installLogEl.textContent = "";
  setStatus("正在启动预览，请看右侧日志（首次安装约 1–5 分钟）…");

  try {
    const res = await window.easyMotion.preview.start();
    if (!res.success) {
      setStatus(res.error?.message || "预览启动失败", true);
      appendInstallLog(`错误：${res.error?.message || "未知"}`);
      return;
    }
    if (previewFrameEl) {
      previewFrameEl.src = res.data.url;
      previewFrameEl.style.display = "block";
    }
    if (seekInputEl) seekInputEl.max = "89";
    setStatus(`预览已启动：${res.data.url}`);
  } catch (err) {
    setStatus(err?.message || String(err), true);
    appendInstallLog(`异常：${err?.message || err}`);
  } finally {
    if (previewStartBtn) {
      previewStartBtn.disabled = false;
      previewStartBtn.textContent = "启动预览";
    }
  }
}

document.getElementById("previewStartBtn")?.addEventListener("click", startPreview);
document.getElementById("previewStopBtn")?.addEventListener("click", async () => {
  await window.easyMotion.preview.stop();
  if (previewFrameEl) {
    previewFrameEl.src = "about:blank";
    previewFrameEl.style.display = "none";
  }
  setStatus("预览已停止");
});
document.getElementById("previewPlayBtn")?.addEventListener("click", () => postToPreview({ type: "PLAY" }));
document.getElementById("previewPauseBtn")?.addEventListener("click", () => postToPreview({ type: "PAUSE" }));
seekInputEl?.addEventListener("input", () => {
  postToPreview({ type: "SEEK", frame: Number(seekInputEl.value) });
});

refreshRecent();
refreshCurrent();
