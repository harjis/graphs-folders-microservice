let folderServiceWebPort: number;
if (!process.env.FOLDERS_SERVICE_WEB_PORT) {
  throw new Error('Please define: FOLDERS_SERVICE_WEB_PORT');
} else {
  folderServiceWebPort = parseInt(process.env.FOLDERS_SERVICE_WEB_PORT);
}

let kafkaHost: string;
if (!process.env.KAFKA_HOST) {
  throw new Error('Please define: KAFKA_HOST');
} else {
  kafkaHost = process.env.KAFKA_HOST;
}

export default {
  folderServiceWebPort,
  kafkaHost
};
