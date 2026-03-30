import express from "express";
import { addfeatureFlag, getFeatureFlag } from "../services/featureFlag.service";

const app = express();

app.get("/features/:id", (req, res) => {
    const id =  Number(req.params.id);
    const data = getFeatureFlag(id);
    return res.json(data);
})


app.put("/features", (req, res) => {
    const name = req.name;
    const state = req.state;

    const id = addfeatureFlag(name, state);
    return id;

} )