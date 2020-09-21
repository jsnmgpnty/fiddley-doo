export const getConfig = (): any => {
  const config = {
    appName: process.env.APP_NAME,
    appPort: parseInt(process.env.APP_PORT),
    messaging: {
      exchanges: [
        {
          name: process.env.MESSAGING_EXCHANGE_NAME,
          type: process.env.MESSAGING_EXCHANGE_TYPE,
        },
      ],
      uri: process.env.MESSAGING_URI,
      connectionInitOptions: { wait: false },
      connectionManagerOptions: { heartbeatIntervalInSeconds: 60 },
    },
    database: {
      connectionString: process.env.DATABASE_CONNECTION_STRING,
    },
    swagger: {
      title: process.env.SWAGGER_TITLE,
      description: process.env.SWAGGER_DESCRIPTION,
      version: process.env.SWAGGER_VERSION,
    },
    elasticSearch: {
      url: process.env.ELASTIC_SEARCH_URL,
      index: process.env.ELASTIC_SEARCH_INDEX,
    },
  };
  return config;
};
