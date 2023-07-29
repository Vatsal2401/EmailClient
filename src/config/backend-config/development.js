const config = {
    mysql: {
      host: '127.0.0.1',
      hostForWebhook: '127.0.0.1',
      hostForReadWrite: '127.0.0.1',
      port: '3306',
      portForReadWrite: '3306',
      name: 'newlocal_mysoulcrm_com',
      username: 'root',
      password: 'admin',
      poolSize: 10,
      debug: false,
    //   dbBackupEncryptionSecret: 'eThAmZq4t2w!z%C*M-JaNdRfQjXn2r9u\n',
    //   genericDbName: 'accounts_dev_salesmate_io',
    }
  };
  module.exports = config;
  