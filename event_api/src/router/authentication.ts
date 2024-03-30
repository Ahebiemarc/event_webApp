import express  from "express";

import {registerUserController, loginUserController} from "../controllers/authentication"
import upload from "../helpers/multer";

export default (router: express.Router) => {
    router.post("/auth/register", upload.single('profilePhoto'), registerUserController);
    router.post("/auth/login", loginUserController);
}