import {Request, Response} from 'express';
import { ReviewModel } from '../models/Review';


export const createReviewController = async  (req: Request, res: Response) =>{
    try {

        const {title, description, note} = req.body;
        const currentDate = new Date();
        const userId = req.userId;
        const eventId = req.params.eventId;

        if (!eventId) {
            return res.status(400).json({ message: "l'évènement non trouvé" }); 
        }

        const newReview = ReviewModel.create({title, description, date:currentDate, note, userId, eventId});
        
        res.status(201).json({ message: "Critique créée avec succès", review: newReview });

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de review'.", error: error.message })

    }
}