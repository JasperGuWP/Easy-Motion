/**
 * PreviewService
 * Manages the Vite dev server lifecycle for Remotion preview,
 * writes generated TSX files to disk, and broadcasts status changes.
 */

import { BrowserWindow } from 'electron';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { writeFile, mkdir } from 'node:fs/promises';
import type { PreviewServerState, PreviewServerStatus, StartServerResult } from '@easymotion/shared';
import { RENDERER_CHANNELS } from '@easymotion/shared';

type ViteDevServer = Awaited<ReturnType<typeof import('vite').createServer>>;

export class PreviewService {
  private server: ViteDevServer | null = null;
  private currentSubprojectId: string | null = null;
  private currentProjectPath: string | null = null;
  private currentPort: number | null = null;
  private status: PreviewServerStatus = 'stopped';
  private mainWindow: BrowserWindow | null = null;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  async startServer(subprojectId: string, projectPath: string): Promise<StartServerResult> {
    // If already running for the same subproject, return existing URL
    if (this.status === 'running' && this.currentSubprojectId === subprojectId) {
      return {
        url: `http://localhost:${this.currentPort}/preview/`,
        port: this.currentPort!,
      };
    }

    // If running for a different subproject, stop first
    if (this.status === 'running') {
      await this.stopServer();
    }

    const remotionPath = join(projectPath, 'subprojects', subprojectId, 'remotion');

    // Verify remotion directory exists
    if (!existsSync(remotionPath)) {
      throw new Error(`Remotion project not found at: ${remotionPath}`);
    }

    // Check for node_modules
    const nodeModulesPath = join(remotionPath, 'node_modules');
    if (!existsSync(nodeModulesPath)) {
      this.setStatus('installing');
      await this.ensureNpmInstalled(remotionPath);
    }

    this.setStatus('starting');
    this.currentSubprojectId = subprojectId;
    this.currentProjectPath = projectPath;

    const { createServer } = await import('vite');

    const viteConfigPath = join(remotionPath, 'vite.config.ts');

    this.server = await createServer({
      root: remotionPath,
      configFile: existsSync(viteConfigPath) ? viteConfigPath : undefined,
      server: {
        port: 0,
        strictPort: false,
      },
    });

    await this.server.listen();
    this.currentPort = this.server.config.server.port as number;
    this.setStatus('running');

    return {
      url: `http://localhost:${this.currentPort}/preview/`,
      port: this.currentPort,
    };
  }

  async stopServer(): Promise<void> {
    if (!this.server) {
      this.setStatus('stopped');
      return;
    }

    try {
      await this.server.close();
    } catch (err) {
      console.error('Error closing Vite dev server:', err);
    }

    this.server = null;
    this.currentPort = null;
    this.currentSubprojectId = null;
    this.currentProjectPath = null;
    this.setStatus('stopped');
  }

  getStatus(): PreviewServerState {
    return {
      status: this.status,
      port: this.currentPort,
      url: this.currentPort ? `http://localhost:${this.currentPort}/preview/` : null,
      error: null,
      subprojectId: this.currentSubprojectId,
    };
  }

  async writeGeneratedFiles(rootTsx: string, mainSequenceTsx: string): Promise<void> {
    if (!this.currentProjectPath || !this.currentSubprojectId) {
      throw new Error('Preview server not running. Cannot write generated files.');
    }

    const remotionPath = join(
      this.currentProjectPath,
      'subprojects',
      this.currentSubprojectId,
      'remotion'
    );

    const srcPath = join(remotionPath, 'src');
    const componentsPath = join(srcPath, 'components');

    // Ensure directories exist
    await mkdir(componentsPath, { recursive: true });

    // Write Root.tsx
    await writeFile(join(srcPath, 'Root.tsx'), rootTsx, 'utf-8');

    // Write MainSequence.tsx
    await writeFile(join(componentsPath, 'MainSequence.tsx'), mainSequenceTsx, 'utf-8');
  }

  private setStatus(status: PreviewServerStatus): void {
    this.status = status;
    this.broadcastStatus();
  }

  private broadcastStatus(): void {
    if (!this.mainWindow?.webContents) return;
    this.mainWindow.webContents.send(RENDERER_CHANNELS.PREVIEW_STATUS_CHANGED, this.getStatus());
  }

  private async ensureNpmInstalled(remotionPath: string): Promise<void> {
    const { exec } = await import('node:child_process');
    const { promisify } = await import('node:util');
    const execAsync = promisify(exec);

    try {
      await execAsync('npm install', { cwd: remotionPath });
    } catch (err) {
      console.error('npm install failed for remotion project:', err);
      throw new Error(`Failed to install remotion dependencies: ${err}`);
    }
  }
}
