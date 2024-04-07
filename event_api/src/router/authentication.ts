import {Router}  from "express";

import {registerUserController, loginUserController,  logoutController} from "../controllers/authentication"
import {uploadImgProfile} from "../helpers/multer";
import { isAuthenticated } from "../middlewares/index";
export default (router: Router) => {
    router.post("/auth/register", uploadImgProfile.single('profilePhoto'), registerUserController);
    router.post("/auth/login", loginUserController);
    router.get('/auth/logout', isAuthenticated, logoutController);
}