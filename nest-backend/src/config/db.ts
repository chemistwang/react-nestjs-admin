const DBOption = {
  postgres: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'psql',
    password: 'herin123',
    database: 'herindemo',
    models: [],
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
};

export default DBOption;
