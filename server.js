import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/events/buy-click", async (req, res) => {
  const { productId, eventType, timestamp, userId } = await req.body;
  console.log(
    `Buy Click Event: Product ${productId}, User ${userId}, Timestamp: ${timestamp}`
  );
  res.status(200).send({ message: `buy click event received` });
});

app.post("/api/events/product-view", async (req, res) => {
  const { productId, eventType, timestamp, duration, userId } = await req.body;
  console.log(
    `Product View Event: Product ${productId}, Duration: ${duration} ms, Timestamp: ${timestamp}`
  );
  res.status(200).send({ message: `Product view event received` });
});

app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
