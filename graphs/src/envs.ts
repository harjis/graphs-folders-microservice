let graphServiceWebPort: number;
if (!process.env.GRAPHS_SERVICE_WEB_PORT) {
  throw new Error('Please define: GRAPHS_SERVICE_WEB_PORT');
} else {
  graphServiceWebPort = parseInt(process.env.GRAPHS_SERVICE_WEB_PORT);
}

export default {
  graphServiceWebPort,
};
