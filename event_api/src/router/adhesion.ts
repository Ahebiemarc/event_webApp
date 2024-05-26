import { Router } from "express";

import { isAuthenticated } from "../middlewares/index";
import { createAdhesionController, getAdhesionByeventId, getAllAdhesion } from "../controllers/adhesion";
export default (router: Router) => {
    router.post("/adhesion/:eventId", isAuthenticated, createAdhesionController);
    router.get("/adhesions/:eventId", getAdhesionByeventId);
    router.get("/adhesions", getAllAdhesion);

}