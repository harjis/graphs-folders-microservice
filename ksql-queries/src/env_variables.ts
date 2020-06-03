type EnvironmentVariables = {
  port: number;
  ksqlServerHost: string;
  ksqlServerPort: string;
};
type CliEnvValue = string | undefined;
type EnvWithErrors = { value: string | number; errors: string[] };
type EnvironmentVariablesWithErrors = {
  port: EnvWithErrors;
  ksqlServerHost: EnvWithErrors;
  ksqlServerPort: EnvWithErrors;
};

const environmentVariablesWithErrors: EnvironmentVariablesWithErrors = {
  port: numberGrtZero(
    'port',
    process.env.KSQL_QUERIES_CLUSTER_IP_SERVICE_SERVICE_PORT
  ),
  ksqlServerHost: nonEmptyString('ksqlServerUrl', process.env.MY_KAFKA_CP_KSQL_SERVER_PORT_8088_TCP_ADDR),
  ksqlServerPort: numberGrtZero('ksqlServerPort', process.env.MY_KAFKA_CP_KSQL_SERVER_PORT_8088_TCP_PORT)
};

const nestedErrors = Object.values(environmentVariablesWithErrors).map(
  env => env.errors
);
// Dunno if there is a better way to do this
const flattenedArray = ([] as string[]).concat(...nestedErrors);
if (flattenedArray.length > 0) {
  throw new Error(`Invalid env variables: ${flattenedArray.join(', ')}`);
}

function nonEmptyString(key: string, value: CliEnvValue): EnvWithErrors {
  if (value && value.length > 0) {
    return { value, errors: [] };
  } else {
    return { value: '', errors: [`${key}: should be non empty string`] };
  }
}

function numberGrtZero(key: string, value: CliEnvValue): EnvWithErrors {
  if (value && parseInt(value) > 0) {
    return { value: parseInt(value), errors: [] };
  } else {
    return {
      value: parseInt(''),
      errors: [`${key}: should be number > 0, was: ${value}`]
    };
  }
}

// No typesafety after this! as EnvironmentVariables basically disabled type safety
const environmentVariables = Object.entries(
  environmentVariablesWithErrors
).reduce(
  (main, [key, value]) => ({ ...main, [key]: value.value }),
  {}
) as EnvironmentVariables;

export default environmentVariables;
