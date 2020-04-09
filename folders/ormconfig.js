module.exports = {
  type: 'postgres',
  host: 'localhost', //put 'postgres' here if you want to run in docker-compose
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'graphs-folders-microservice/folders',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  logging: true
};
