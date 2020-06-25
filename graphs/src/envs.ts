let graphServiceWebPort: number;
if (!process.env.GRAPHS_SERVICE_WEB_PORT) {
  throw new Error('Please define: GRAPHS_SERVICE_WEB_PORT');
} else {
  graphServiceWebPort = parseInt(process.env.GRAPHS_SERVICE_WEB_PORT);
}

let kafkaHost: string;
if (!process.env.KAFKA_HOST) {
  throw new Error('Please define: MY_KAFKA_CP_KAFKA_PORT');
} else {
  kafkaHost = process.env.KAFKA_HOST;
}

export default {
  graphServiceWebPort,
  kafkaHost,
};
