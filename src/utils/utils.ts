export const getLastFolderName = (path: string) => {
  const parts = path.split("/");
  return parts[parts.length - 2];
};
