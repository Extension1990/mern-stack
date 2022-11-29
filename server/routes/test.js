import express from "express";
import { MongoClient } from 'mongodb';
const router = express.Router();
const app = express();

router.get("/", (req, res) => {
    res.send("API is running...");
});

export default router;