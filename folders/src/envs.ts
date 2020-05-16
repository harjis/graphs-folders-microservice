let folderServiceWebPort: number;
if (!process.env.FOLDERS_SERVICE_WEB_PORT) {
  throw new Error('Please define: FOLDERS_SERVICE_WEB_PORT');
} else {
  folderServiceWebPort = parseInt(process.env.FOLDERS_SERVICE_WEB_PORT);
}

export default {
  folderServiceWebPort,
};
