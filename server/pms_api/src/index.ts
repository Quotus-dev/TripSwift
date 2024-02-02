import { connect } from "mongoose";
import { handlerUserCreateEvent } from "./utils/kafkaEventHandler";
import { Kafka } from "kafkajs";
import config from "./config";
import express from "express";
import expressLoader from "./loaders/express";

export const kafkaClient = new Kafka({
  clientId: "tripswift-auth",
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS as string],
});

const MONGO_URI = config.mongoURI;
const app = express();

expressLoader({ app }).then(async () => {
  try {
    const connection = await connect(MONGO_URI as string);
    console.log(
      `🏡 Pms database successfully running on ${connection.connection.host}`
    );

    handlerUserCreateEvent();
    app.listen(config.port, () => {
      console.log(`🏡 Pms server is running on port ${config.port}`);
    });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});
