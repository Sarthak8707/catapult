import express from "express";
import cors from "cors";
import {flagRouter} from "./routes/featureFlag.route"
import { projectsRouter } from "./routes/projects.route";
import { environmentsRouter } from "./routes/environments.route";
import { authRouter } from "./routes/auth.route";
import { eventsRouter } from "./routes/events.route";
import { segmentsRouter } from "./routes/segments.route";
import { guardrailRouter } from "./routes/guardrails.route";

const app = express();


app.use(cors());
app.use(express.json());


        // Routes

// Projects Routes

app.use("/projects", projectsRouter);

// Environments Routes

app.use("/environments", environmentsRouter);

// Flags Routes

app.use("/flags", flagRouter);

// Auth Routes

app.use("/auth", authRouter);

// Events Ingestion Routes

app.use("/events", eventsRouter);

// Segments Routes

app.use("/segments", segmentsRouter);

// Guardrails Routes

app.use("/guardrails", guardrailRouter);



app.listen(3000, () => {
    console.log("Server is runnnnnning");
});