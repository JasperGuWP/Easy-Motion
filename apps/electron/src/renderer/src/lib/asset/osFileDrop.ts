/** Electron 环境下 OS 文件拖放：从 DataTransfer 读取绝对路径 */

export function hasOsFiles(dataTransfer: DataTransfer): boolean {
  return (dataTransfer.files?.length ?? 0) > 0;
}

export function readOsFilePaths(dataTransfer: DataTransfer): string[] {
  const paths: string[] = [];
  for (const file of dataTransfer.files) {
    const withPath = file as File & { path?: string };
    if (withPath.path) paths.push(withPath.path);
  }
  return paths;
}
