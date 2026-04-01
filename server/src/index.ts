import express from "express";
import cors from "cors";
import { db } from "./db/client";
import { users } from "./db/schema";

const app = express();


app.use(cors());
app.use(express.json());


app.listen(3000, () => {
    console.log("Server is runnnnnning");
});