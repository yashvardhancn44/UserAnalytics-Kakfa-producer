import { Kafka } from "kafkajs";
import dotenv from "dotenv";
dotenv.config();

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.CONFLUENT_CLOUD_BROKER], // Kafka broker URL (Confluent Cloud or local)
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: process.env.CONFLUENT_CLOUD_API_KEY,
    password: process.env.CONFLUENT_CLOUD_API_SECRET,
  },
});

// Consumer
const consumer = kafka.consumer({ groupId: "test-group" });

async function consumeMessages() {
  await consumer.connect();
  await consumer.subscribe({
    topic: "test-buy-clicks-topic",
    fromBeginning: true,
  });
  await consumer.subscribe({
    topic: "test-product-views-topic",
    fromBeginning: true,
  });
  // await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("messages consuming started");
      // console.log(message);
      const value = JSON.parse(message.value.toString());
      // console.log({
      //   // key: message.key.toString(),
      //   value: JSON.parse(message.value.toString()),
      // });
      console.log(value);
    },
  });
}

consumeMessages().catch(console.error);
