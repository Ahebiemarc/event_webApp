import { Router } from "express";

import {isAuthenticated} from '../middlewares/index'
import {createReviewController} from '../controllers/review'

export default (router: Router) =>{
    router.post('/review/create/:eventId', isAuthenticated, createReviewController);
}