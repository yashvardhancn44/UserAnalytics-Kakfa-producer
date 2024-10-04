import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import {
  initProducer,
  produceMessage,
  disconnectProducer,
} from "./kafkaProducer.js";
dotenv.config();
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());
initProducer();

app.post("/api/events/buy-click", async (req, res) => {
  const { productId, eventType, timestamp, userId } = await req.body;
  const event = {
    productId,
    eventType,
    timestamp,
    userId,
  };
  console.log(
    `Buy Click Event: Product ${productId}, User ${userId}, Timestamp: ${timestamp}`
  );
  try {
    await produceMessage("test-buy-clicks-topic", event);
  } catch (error) {
    console.error("Error producing message:", error);
  }
  res.status(200).send({ message: `buy click event received` });
});

app.post("/api/events/product-view", async (req, res) => {
  const { productId, eventType, timestamp, duration, userId } = await req.body;
  const event = {
    productId,
    eventType,
    timestamp,
    duration,
    userId,
  };
  console.log(
    `Product View Event: Product ${productId}, Duration: ${duration} ms, Timestamp: ${timestamp}`
  );

  try {
    await produceMessage("test-product-views-topic", event);
  } catch (error) {
    console.error("Error producing message:", error);
  }
  res.status(200).send({ message: `Product view event received` });
});

app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
