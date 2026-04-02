import express from "express";
import cors from "cors";
import {flagRouter} from "./routes/featureFlag.route"

const app = express();


app.use(cors());
app.use(express.json());


// Routes

app.use("/flags", flagRouter);


app.listen(3000, () => {
    console.log("Server is runnnnnning");
});