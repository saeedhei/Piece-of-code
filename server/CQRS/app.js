// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const kafka = require('kafka-node');
const mongoose = require('mongoose');
const mysql = require('mysql');

// Create Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Kafka setup
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(kafkaClient);

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/cqrs_read', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  userId: String,
  username: String,
});

const User = mongoose.model('User', userSchema);

// MySQL setup
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'cqrs_write',
});

mysqlConnection.connect();

// Kafka consumer setup
const Consumer = kafka.Consumer;
const consumer = new Consumer(kafkaClient, [{ topic: 'user-created' }], { groupId: 'user-group' });

consumer.on('message', async (message) => {
  const { userId, username } = JSON.parse(message.value);

  // Update MongoDB (read side)
  try {
    await User.findOneAndUpdate({ userId }, { userId, username }, { upsert: true });
    console.log(`User data updated in MongoDB: ${userId}`);
  } catch (err) {
    console.error('Error updating user data in MongoDB:', err);
  }
});

// Express routes
const createUserRoute = require('./routes/createUser');
const getUserRoute = require('./routes/getUser');

app.use(createUserRoute);
app.use(getUserRoute);

// Start the Express application
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
