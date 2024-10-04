import { Kafka } from "kafkajs";
import dotenv from "dotenv";
dotenv.config();

const kafka = new Kafka({
  clientId: "my-kafka-fronted-app",
  brokers: [process.env.CONFLUENT_CLOUD_BROKER], // Kafka broker URL (Confluent Cloud or local)
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: process.env.CONFLUENT_CLOUD_API_KEY,
    password: process.env.CONFLUENT_CLOUD_API_SECRET,
  },
});

const producer = kafka.producer();

// const checkConnection = async () => {
//   await producer.connect();
//   console.log("producer Connected");
// };
const initProducer = async () => {
  await producer.connect();
  console.log("Kafka producer connected to Confluent Cloud");
};

const produceMessage = async (topic, message) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Event sent to ${topic}:`, message);
  } catch (error) {
    console.error("Error sending event to Kafka:", err);
  }
};

const disconnectProducer = async () => {
  await producer.disconnect();
  console.log("Kafka producer disconnected");
};

// const eventMessage = { name: "yash", age: "24" };

// const eventMessage2 = {
//   productId: 1,
//   eventType: "buy-click",
//   timestamp: "2024-10-03T12:34:56Z", // ISO timestamp for precise tracking
//   userId: "user123", // Optional: track user if needed
// };

// async function produce() {
//   try {
//     await produceMessage("test-topic", eventMessage2);
//   } catch (error) {
//     console.error("Error producing message:", error);
//   }
// }
// setInterval(produce, 3000);

export { initProducer, produceMessage, disconnectProducer };
