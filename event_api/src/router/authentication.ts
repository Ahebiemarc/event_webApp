import express  from "express";

import {registerUserController, loginUserController, deleteUserController} from "../controllers/authentication"
import upload from "../helpers/multer";
import { isAuthenticated } from "../middlewares/index";

export default (router: express.Router) => {
    router.post("/auth/register", upload.single('profilePhoto'), registerUserController);
    router.post("/auth/login", loginUserController);
    router.delete('/user/:userId', isAuthenticated, deleteUserController);
}