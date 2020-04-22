let graphServiceWebPort: number;
if (!process.env.GRAPHS_SERVICE_WEB_PORT) {
  throw new Error('Please define: GRAPHS_SERVICE_WEB_PORT');
} else {
  graphServiceWebPort = parseInt(process.env.GRAPHS_SERVICE_WEB_PORT);
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
  graphServiceWebPort,
  natsHost,
  natsPort
};
