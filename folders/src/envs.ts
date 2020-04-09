let graphServiceWebPort: number;
if (!process.env.GRAPH_SERVICE_WEB_PORT) {
  throw new Error('Please define: GRAPH_SERVICE_WEB_PORT');
} else {
  graphServiceWebPort = parseInt(process.env.GRAPH_SERVICE_WEB_PORT);
}

let graphServicePort: number;
if (!process.env.GRAPH_SERVICE_PORT) {
  throw new Error('Please define: GRAPH_SERVICE_PORT');
} else {
  graphServicePort = parseInt(process.env.GRAPH_SERVICE_PORT);
}

let graphServiceHost: string;
if (!process.env.GRAPH_SERVICE_HOST) {
  throw new Error('Please define: GRAPH_SERVICE_HOST');
} else {
  graphServiceHost = process.env.GRAPH_SERVICE_HOST;
}

let folderServiceWebPort: number;
if (!process.env.FOLDER_SERVICE_WEB_PORT) {
  throw new Error('Please define: FOLDER_SERVICE_WEB_PORT');
} else {
  folderServiceWebPort = parseInt(process.env.FOLDER_SERVICE_WEB_PORT);
}

let folderServiceHost: string;
if (!process.env.FOLDER_SERVICE_HOST) {
  throw new Error('Please define: FOLDER_SERVICE_HOST');
} else {
  folderServiceHost = process.env.FOLDER_SERVICE_HOST;
}

let folderServicePort: number;
if (!process.env.FOLDER_SERVICE_PORT) {
  throw new Error('Please define: FOLDER_SERVICE_PORT');
} else {
  folderServicePort = parseInt(process.env.FOLDER_SERVICE_PORT);
}

export default {
  graphServiceWebPort,
  graphServicePort,
  graphServiceHost,
  folderServiceWebPort,
  folderServicePort,
  folderServiceHost,
};
