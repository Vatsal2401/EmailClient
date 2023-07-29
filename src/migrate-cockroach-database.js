const { Sequelize,QueryInterface } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = new Sequelize('db1', 'vatsal', 'cockroach', { 
    dialect: 'postgres',
    host: 'localhost',
    port: 26257,
    logging: false,
    dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        // ca: fs.readFileSync('/cockroach-certs/ca.crt')
        //     .toString(),
        // key: fs.readFileSync('/cockroach-certs/client.root.key')
        //     .toString(),
        // cert: fs.readFileSync('/cockroach-certs/client.root.crt')
        //     .toString(),
        }
      }
   });
const umzug = new Umzug({
    migrations: { glob: 'migrations-mysql/*.js' },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});
(async () => {
    await umzug.up();
  })();