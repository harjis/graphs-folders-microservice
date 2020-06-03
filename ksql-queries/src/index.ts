import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';

import {
  getGraphById,
  getMostPopularFolders
} from './controllers/ksql_controller';
import environmentVariables from './env_variables';

const app = express();
app.use(bodyParser.json());
app.set('port', environmentVariables.port);
app.get('/graphById', getGraphById);
app.get('/mostPopular', getMostPopularFolders);

app.use(errorHandler());

app.listen(environmentVariables.port, () => {
  console.log(
    '  App is running at http://localhost:%d',
    environmentVariables.port
  );
  console.log('  Press CTRL-C to stop\n');
});
