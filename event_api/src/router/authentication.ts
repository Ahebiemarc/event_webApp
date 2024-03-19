import express  from "express";

import {registerUserController} from "../controllers/authentication"

export default (router: express.Router) => {
    router.post("/auth/register", registerUserController);
}