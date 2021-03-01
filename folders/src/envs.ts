let folderServiceWebPort: number;
if (!process.env.FOLDERS_SERVICE_WEB_PORT) {
  throw new Error('Please define: FOLDERS_SERVICE_WEB_PORT');
} else {
  folderServiceWebPort = parseInt(process.env.FOLDERS_SERVICE_WEB_PORT);
}

let natsHost: string;
if (!process.env.NATS_HOST) {
  throw new Error('Please define: NATS_HOST');
} else {
  natsHost = process.env.NATS_HOST;
}

let natsPort: string;
if (!process.env.NATS_PORT) {
  throw new Error('Please define: NATS_PORT');
} else {
  natsPort = process.env.NATS_PORT;
}

export default {
  folderServiceWebPort,
  natsHost,
  natsPort,
};
