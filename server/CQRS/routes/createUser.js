const express = require('express');
const kafka = require('kafka-node');
const mysql = require('mysql');

const router = express.Router();

const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(kafkaClient);

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'cqrs_write',
});

mysqlConnection.connect();

router.post('/createUser', async (req, res) => {
  const { userId, username } = req.body;

  // Write to MySQL
  const insertQuery = `INSERT INTO users (userId, username) VALUES ('${userId}', '${username}')`;

  mysqlConnection.query(insertQuery, (err) => {
    if (err) throw err;

    // Produce a message to Kafka for eventual consistency
    const payloads = [{ topic: 'user-created', messages: JSON.stringify({ userId, username }) }];

    producer.send(payloads, (kafkaErr, data) => {
      if (kafkaErr) {
        console.error('Error sending message to Kafka:', kafkaErr);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'User created successfully' });
      }
    });
  });
});

module.exports = router;
