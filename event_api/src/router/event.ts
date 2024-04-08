import { Router } from "express";

import { createEventController, deleteEventController, getAllEventsController, getEventByIdController, getEventsWithLimitController, getEventsWithPaginationController, updateEventController } from '../controllers/event';
import { isAuthenticated } from '../middlewares/index';
import {uploadImgEvent} from '../helpers/multer'

export default (router: Router) => {
    router.post('/event/create', isAuthenticated, uploadImgEvent.single('photo'), createEventController);
    router.put('/event/upload/:eventId', isAuthenticated, uploadImgEvent.single('photo'), updateEventController);
    router.delete('/event/:eventId', isAuthenticated, deleteEventController);
    router.get('/event/:eventId', getEventByIdController);
    router.get('/events', getAllEventsController);
    router.get('/events-limit', getEventsWithLimitController);
    router.get('/events-pagination', getEventsWithPaginationController)
    
}