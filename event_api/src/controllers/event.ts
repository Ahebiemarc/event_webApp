import { Request, Response } from "express";
import path from "path";
import { EventModel } from "../models/Event";
import { ReviewModel } from "../models/Review";
import fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);


export const createEventController = async (req: Request, res: Response) => {
    try {

        const {title, description, price, date, location} = req.body;
        const creator_id = req.userId
        const photo = req.file.path
        const correctPhotoPath = photo.split(path.sep).join("/")
        console.log(title, description, price, date, location, correctPhotoPath, creator_id);
        

        if (!title || !description || !date || !location || !photo) {
            return res.status(400).json({ message: "tous les champs sont requis" });
        }

        const newEvent = await EventModel.createEvent({
            title,
            description,
            price,
            date,
            location,
            photo: correctPhotoPath,
            creator_id
        })

        res.status(201).json({message: 'évènement créée avec succès', event: newEvent})

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de nouvel évènement.", error: error.message })
    }
}

export const getEventByIdController = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.eventId
        const event = await EventModel.getEventById(eventId);
        const reviewEvent = await ReviewModel.getReviewsByEventId(eventId)

        event.reviews = reviewEvent

        event.save()

        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'évènement.", error: error.message })
    }
}


export const getAllEventsController = async (req: Request, res: Response) => {
    try {
        const events = await EventModel.getAllEvents()
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des évènements.", error: error.message })
    }
}

export const deleteEventController = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.eventId
        const userId = req.userId;
        const event = await EventModel.getEventById(eventId);

        if (userId !== event.creator_id) {
            return res.status(400).json({ message: "Action non authorisé" });
        }

        const deletedEvent = await EventModel.deleteEventById(eventId)
        if(deletedEvent.photo){
            await unlinkAsync(deletedEvent.photo)
        }
        res.status(200).json({message: 'évènement supprimé avec succès'})
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'évènement.", error: error.message })
    } 
}

export const updateEventController = async (req: Request, res: Response) => {
    try {

        const { eventId } = req.params;
        const userId = req.userId;

        const event = await EventModel.getEventById(eventId)
        if (!event) {
            return res.status(400).json({ message: "Évènement non trouvé" });
        }

        if (userId !== event.creator_id) {
            return res.status(400).json({ message: "Action non authorisé" });
        }

        const eventData = req.body;
        const newPhotoPath = req.file ? req.file.path : null;
        const correctPhotoPath = newPhotoPath ? newPhotoPath.split(path.sep).join("/") : null;

        // Si une nouvelle photo est fournie et l'ancienne photo existe, supprimez l'ancienne photo
        if (correctPhotoPath && event.photo) {
            await unlinkAsync(event.photo);
        }
        
        // Mettre à jour l'événement avec les nouvelles données
        const updatedEvent = await EventModel.updateEvent(event, eventData);
        if(correctPhotoPath) {
            updatedEvent.photo = correctPhotoPath
        }
        await updatedEvent.save();

        if (!updatedEvent) {
            return res.status(404).json({ message: "Événement non sauvegardé." });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'événement.", error: error.message });
    }
};

export const findEventController = async (req: Request, res: Response) => {
    try {
        const {search} = req.body
        const uniqueEvents = await EventModel.findUniqueEvents(search, search, search);

        

        res.status(200).json(uniqueEvents);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'évènement.", error: error.message });
    }
}

export const getEventsWithLimitController = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string, 10); // Convertir la limite en nombre entier
        if (!limit || isNaN(limit)) {
            return res.status(400).json({ message: "La limite est invalide." });
        }

        // Utilisez la méthode statique pour récupérer les événements avec une limite
        const events = await EventModel.getEventsWithLimit(limit).exec();

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des événements.", error: error.message });
    }
};


export const getEventsWithPaginationController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1; // Page par défaut: 1
        const limit = parseInt(req.query.limit as string, 10) || 10; // Limite par défaut: 10

        // Utiliser la méthode statique pour récupérer les événements avec pagination
        const events = await EventModel.getEventsWithPagination(page, limit).exec();

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des événements.", error: error.message });
    }
};

export const getAllEventTagsController = async (req: Request, res: Response) => {
    try {
        // Utiliser la méthode statique pour récupérer tous les titres d'événement
        const titles = await EventModel.getAllEventTags();

        res.status(200).json(titles);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des titres d'événement.", error: error.message });
    }
};


export const getEventsByUserIdController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const events = await EventModel.getEventsByUserId(userId)
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des événements.", error: error.message })
    }
};



