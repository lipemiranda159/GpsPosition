import express from "express";
import locationController from "../src/controllers/locationController";
const locationRoute = express.Router();
const locController = new locationController();
locationRoute.get("/location/:deviceId", locController.getLocation);

export default locationRoute;
