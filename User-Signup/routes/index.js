var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit', async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect(url);
    const collection = client.db('signup').collection('signedUsers');
    const result = await collection.insertOne(req.body);
    console.log('Successfully inserted:', result.insertedId);
  } catch (err) {
    console.log('Failed...', err);
  } finally {
    if (client) {
      client?.close();
    }
  }
  res.send('Got it')
})

module.exports = router;
