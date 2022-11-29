import express from "express";
import { MongoClient } from 'mongodb';
import mongoose from "mongoose";
import dotenv  from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import test from "./routes/test.js";

const port = process.env.PORT || 3000;

const app = express();
dotenv.config();

// Define routes
// import userRoute from './routes/user.js';
// import authRoute from './routes/auth.js';

// // Use/register our routes
// app.use('/api', userRoute);
// app.use('/api', authRoute);
app.use('/api', test);

// Cors middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
    next();
  });

// Main function
async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = process.env.MONGODB_URI;


  const client = new MongoClient(uri);

  try {
      // Connect to the MongoDB cluster
      mongoose 
      .connect(uri)   
      .then(() => console.log("MongoDB database connected successfully!"))
      .catch(err => console.log(err));

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);

app.listen(port, function() {
    console.log('Listening on port: ' + port);
});