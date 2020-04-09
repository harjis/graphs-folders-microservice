let graphServiceWebPort: number;
if (!process.env.GRAPHS_SERVICE_WEB_PORT) {
  throw new Error('Please define: GRAPHS_SERVICE_WEB_PORT');
} else {
  graphServiceWebPort = parseInt(process.env.GRAPHS_SERVICE_WEB_PORT);
}

let graphServicePort: number;
if (!process.env.GRAPHS_SERVICE_PORT) {
  throw new Error('Please define: GRAPHS_SERVICE_PORT');
} else {
  graphServicePort = parseInt(process.env.GRAPHS_SERVICE_PORT);
}

let graphServiceHost: string;
if (!process.env.GRAPHS_SERVICE_HOST) {
  throw new Error('Please define: GRAPHS_SERVICE_HOST');
} else {
  graphServiceHost = process.env.GRAPHS_SERVICE_HOST;
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
  graphServiceWebPort,
  graphServicePort,
  graphServiceHost,
  folderServicePort,
  folderServiceHost,
};
