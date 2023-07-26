require('dotenv').config()

export default {
    dbName: process.env.MONGODB_DATABASE,
    accessTokenPrivateKey: 'ACCESS_TOKEN_PRIVATE_KEY',
    accessTokenPublicKey: 'ACCESS_TOKEN_PUBLIC_KEY',
  };


