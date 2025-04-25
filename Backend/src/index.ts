import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/userRouter";
import cors from "cors";

dotenv.config();
const app: Application = express();
app.use(express.json());
app.use(cors({
        origin: 'https://second-brain-frontend-iota.vercel.app'
}));

declare module 'express-serve-static-core' {
        interface Request {
                userID?: string;
        }
}

app.use("/api/v1/user", userRouter);

async function main(): Promise<void> {
        try {
                const dbUri = process.env.DB_CONNECTION_STRING;

                if (!dbUri) {
                        throw new Error("DB_CONNECTION_STRING is not defined in .env");
                }

                await mongoose.connect(dbUri);
                console.log("I am listening")
                // app.listen(3000);

        } catch (error) {
                console.error("Failed to start the server:", error);
                process.exit(1);
        }
}

main();

module.exports = app;
