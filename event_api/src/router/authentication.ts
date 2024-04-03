import {Router}  from "express";

import {registerUserController, loginUserController} from "../controllers/authentication"
import {uploadImgProfile} from "../helpers/multer";
export default (router: Router) => {
    router.post("/auth/register", uploadImgProfile.single('profilePhoto'), registerUserController);
    router.post("/auth/login", loginUserController);
}