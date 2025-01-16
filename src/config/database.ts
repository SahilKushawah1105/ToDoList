import mongoose, { Connection } from 'mongoose';

// Replace with your actual MongoDB connection string
const mongoURI = process.env.MONGO_URL || ""

// Connect to the MongoDB database
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err: Error) => {
    console.error(`Error in Database connection: ${err.message}`);
  });

// Enable debug mode for Mongoose
mongoose.set('debug', true);

// Monitor connection events
const dbConnection: Connection = mongoose.connection;

dbConnection.on('connected', () => {
  console.log('Mongoose connected to database');
});

dbConnection.on('error', (err: Error) => {
  console.error(`Mongoose connection error: ${err.message}`);
});

dbConnection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
