import express from "express";
import cors from "cors";
import {flagRouter} from "./routes/featureFlag.route"
import { organizationsRouter } from "./routes/organizations.route";
import { projectsRouter } from "./routes/projects.route";
import { environmentsRouter } from "./routes/environments.route";
import { authRouter } from "./routes/auth.route";

const app = express();


app.use(cors());
app.use(express.json());


        // Routes

// Organization Routes

app.use("/organizations", organizationsRouter);

// Projects Routes

app.use("/projects", projectsRouter);

// Environments Routes

app.use("/environments", environmentsRouter);

// Flags Routes

app.use("/flags", flagRouter);

// Auth Routes

app.use("/auth", authRouter);


app.listen(3000, () => {
    console.log("Server is runnnnnning");
});