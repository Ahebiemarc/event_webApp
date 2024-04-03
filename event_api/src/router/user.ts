import {Router} from 'express';

import { getAllUsersController, deleteUserController, updateUserController, getUserController } from '../controllers/user';
import { isAuthenticated, isAdmin } from '../middlewares/index';
import { uploadImgProfile } from '../helpers/multer';

export default(router: Router) =>{
    router.get('/users', isAuthenticated, isAdmin, getAllUsersController);
    router.get('/user/:userId', isAuthenticated, getUserController);
    router.delete('/user/:userId', isAuthenticated, deleteUserController);
    router.put('/user/:userId', isAuthenticated, uploadImgProfile.single('profilePhoto'), updateUserController);
}