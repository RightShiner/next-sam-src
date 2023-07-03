import mongoose from 'mongoose';
const fs = require('fs');

//const connection =  /* creating connection object*/
global.connection = global.connection || {};

// e.g. development / staging / production
const APP_ENV = process.env.APP_ENV;

// load env
if (APP_ENV) {
  const text = fs.readFileSync(`./.env.${APP_ENV}`, 'utf-8');
  const envs = text.toString().split('\n');
  envs.forEach((item) => {
    const arr = item.split('=');
    const key = arr.shift();
    process.env[key] = arr.join('=').trim();
  });
}

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (global.connection.isConnected) {
    return true;
  }

  let dbConnectUrl = '';
  let path = `${process.cwd()}/src/certificates/rds-combined-ca-bundle.pem`;
  console.log(path);

  dbConnectUrl =
    'mongodb://' +
    process.env.MONGODB_USER_AWS +
    ':' +
    process.env.MONGODB_USER_PWD +
    '@' +
    process.env.MONGODB_URI_AWS;

  console.log(dbConnectUrl);

  await mongoose
    .connect('mongodb://localhost:27017/ainc_db', {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      global.connection.isConnected = true;
      console.log('MongoDB Connected...');
    })
    .catch((e) => {
      global.connection.isConnected = false;
    });
  // await mongoose
  //   .connect(dbConnectUrl, {
  //     ssl: true,
  //     sslValidate: false,
  //     sslCA: path,
  //   })
  //   .then(() => {
  //     global.connection.isConnected = true;
  //   })
  //   .catch((e) => {
  //     global.connection.isConnected = false;
  //   });

  return global.connection.isConnected;
}

export default dbConnect;
