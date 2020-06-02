import express from 'express';
import bodyParser from 'body-parser';

import * as ksqlController from './controllers/ksql_controller';
import environmentVariables from './env_variables';
import errorHandler from 'errorhandler';

const app = express();
app.use(bodyParser.json());
app.set('port', environmentVariables.port);
app.get('/', ksqlController.index);

if (environmentVariables.mode === 'development') {
  app.use(errorHandler());
}
app.listen(environmentVariables.port, () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    environmentVariables.port,
    environmentVariables.mode
  );
  console.log('  Press CTRL-C to stop\n');
});
