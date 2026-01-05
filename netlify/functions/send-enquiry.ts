import serverless from "serverless-http";
import express from "express";
import { handleEnquiry } from "../../server/routes/enquiry";

const app = express();
app.use(express.json());
app.post("/", handleEnquiry);

export const handler = serverless(app);
