import got from 'got';
import environmentVariables from '../env_variables';

const url = `http://${environmentVariables.ksqlServerHost}:${environmentVariables.ksqlServerPort}`;
const queryUrl = `${url}/query`;

export const graphById = async (graphId: number) => {
  const payload = {
    ksql: `SELECT * FROM graphs_mv WHERE ROWKEY=${graphId};`,
    streamsProperties: {
      'ksql.streams.auto.offset.reset': 'earliest'
    }
  };
  return execute(payload);
};

export const mostPopularFolders = async () => {
  const payload = {
    ksql: 'SELECT * FROM most_popular_folders EMIT CHANGES LIMIT 2;',
    streamsProperties: {
      'ksql.streams.auto.offset.reset': 'earliest'
    }
  };

  return execute(payload);
};

const execute = async (payload: Record<string, Object | string>) => {
  try {
    const response = await got.post(queryUrl, {
      json: payload,
      responseType: 'json'
    });
    return response.body;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
