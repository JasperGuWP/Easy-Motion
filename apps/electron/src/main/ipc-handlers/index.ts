/**
 * 注册所有 IPC 处理器
 * 在主进程启动时调用
 */
import { registerProjectHandlers } from './project';
import { registerTimelineHandlers } from './timeline';
import { registerPreviewHandlers } from './preview';
import type { ProjectService } from '../project-service';
import type { TimelineGenerator } from '../generator';
import type { PreviewService } from '../preview-service';

interface HandlerDeps {
  projectService: ProjectService;
  generator: TimelineGenerator;
  previewService: PreviewService;
}

export function registerAllIpcHandlers(deps: HandlerDeps): void {
  registerProjectHandlers(deps);
  registerTimelineHandlers(deps);
  registerPreviewHandlers(deps);
}
