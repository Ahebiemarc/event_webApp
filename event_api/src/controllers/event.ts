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

export const findEvent = async (req: Request, res: Response) => {
    try {
        const search = req.body
        const filter  = {}
        //const eventByTitle = await EventModel.findEventByTitle

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'évènement.", error: error.message });
    }
}