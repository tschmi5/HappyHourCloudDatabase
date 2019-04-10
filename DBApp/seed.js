const MongoClient = require('mongodb').MongoClient;
const URL = MONGO_CONNECTION;

MongoClient.connect(URL, async (err, client) => {
  if (err) throw err;
  client.db().collection('');
  client.close();
});