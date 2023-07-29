const { Sequelize,QueryInterface } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = new Sequelize('db5', 'root', 'admin', { dialect: 'mysql' });
const umzug = new Umzug({
    migrations: { glob: 'migrations-mysql/*.js' },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});
(async () => {
    await umzug.up();
  })();