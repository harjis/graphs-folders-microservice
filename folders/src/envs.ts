let folderServiceWebPort: number;
if (!process.env.FOLDERS_SERVICE_WEB_PORT) {
  throw new Error('Please define: FOLDERS_SERVICE_WEB_PORT');
} else {
  folderServiceWebPort = parseInt(process.env.FOLDERS_SERVICE_WEB_PORT);
}

let folderServiceHost: string;
if (!process.env.FOLDERS_SERVICE_HOST) {
  throw new Error('Please define: FOLDERS_SERVICE_HOST');
} else {
  folderServiceHost = process.env.FOLDERS_SERVICE_HOST;
}

let folderServicePort: number;
if (!process.env.FOLDERS_SERVICE_PORT) {
  throw new Error('Please define: FOLDERS_SERVICE_PORT');
} else {
  folderServicePort = parseInt(process.env.FOLDERS_SERVICE_PORT);
}

export default {
  folderServiceWebPort,
  folderServicePort,
  folderServiceHost,
};
