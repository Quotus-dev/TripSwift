import mongoose from "mongoose";
import { DB_NAME } from "../utils/constant";

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        // console.log(mongoURI)

        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }

        const connectionInstance = await mongoose.connect(mongoURI, {
            dbName: DB_NAME, // Specify the database name if it's not included in the URI
        });

        console.log(`⚙️ MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        return connectionInstance
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};
export default connectDB;
