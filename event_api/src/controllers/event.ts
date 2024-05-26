import { Request, Response } from "express";
import path from "path";
import { EventModel } from "../models/Event";
import { ReviewModel } from "../models/Review";
import fs from 'fs';
import { promisify } from 'util';
import { AdhesionModel } from "../models/Adhesion";
import { UserModel } from "../models/User";

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
        const eventSubscriber = await AdhesionModel.getAllAdh()
        const allUsers = await UserModel.getAllUsers();
        const filteredSubscribers = eventSubscriber.filter(subscriber => subscriber.eventId === eventId).map(subscriber => subscriber.userId);

        const userIdSub: string[]  = filteredSubscribers;
        const profilePhotos = userIdSub.map(userId => {
            const user = allUsers.find(user => user._id.toString() === userId);
            return user ? user.profilePhoto : null;
        });

        event.reviews = reviewEvent
        event.subscribers = profilePhotos

        event.save()

        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'évènement.", error: error.message })
    }
}


export const getAllEventsController = async (req: Request, res: Response) => {
    try {
        // Récupérer tous les événements
        const events = await EventModel.getAllEvents();

        // Récupérer toutes les adhésions
        const allAdhesions = await AdhesionModel.getAllAdh();
        // Récupérer tous les utilisateurs
        const allUsers = await UserModel.getAllUsers();

        // Associer les profilePhoto de chaque utilisateur correspondant à userId dans event.subscribers
        const updatedEvents = events.map(event => {
            // Récupérer les adhésions correspondant à l'événement actuel
            const adhesionsForEvent = allAdhesions.filter(adhesion => adhesion.eventId === event._id.toString());

            // Récupérer les userId des adhésions
            const userIds = adhesionsForEvent.map(adhesion => adhesion.userId);

            // Récupérer les profilePhoto des utilisateurs correspondants
            const profilePhotos = userIds.map(userId => {
                const user = allUsers.find(user => user._id.toString() === userId);
                return user ? user.profilePhoto : null;
            });

            // Assigner les profilePhoto à event.subscribers
            event.subscribers = profilePhotos;
            
            event.save();

            return event;
        });
        res.status(200).json(updatedEvents)
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
        const search = req.query.search.toString();
        const uniqueEvents = await EventModel.findUniqueEvents(search, search, search);

        // Récupérer toutes les adhésions
        const allAdhesions = await AdhesionModel.getAllAdh();
        // Récupérer tous les utilisateurs
        const allUsers = await UserModel.getAllUsers();

        // Associer les profilePhoto de chaque utilisateur correspondant à userId dans event.subscribers
        const updatedEvents = uniqueEvents.map(event => {
            // Récupérer les adhésions correspondant à l'événement actuel
            const adhesionsForEvent = allAdhesions.filter(adhesion => adhesion.eventId === event._id.toString());

            // Récupérer les userId des adhésions
            const userIds = adhesionsForEvent.map(adhesion => adhesion.userId);

            // Récupérer les profilePhoto des utilisateurs correspondants
            const profilePhotos = userIds.map(userId => {
                const user = allUsers.find(user => user._id.toString() === userId);
                return user ? user.profilePhoto : null;
            });

            // Assigner les profilePhoto à event.subscribers
            event.subscribers = profilePhotos;
            
            event.save();

            return event;
        });
        

        res.status(200).json(updatedEvents);
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

         // Récupérer toutes les adhésions
         const allAdhesions = await AdhesionModel.getAllAdh();
         // Récupérer tous les utilisateurs
         const allUsers = await UserModel.getAllUsers();
 
         // Associer les profilePhoto de chaque utilisateur correspondant à userId dans event.subscribers
         const updatedEvents = events.map(event => {
             // Récupérer les adhésions correspondant à l'événement actuel
             const adhesionsForEvent = allAdhesions.filter(adhesion => adhesion.eventId === event._id.toString());
 
             // Récupérer les userId des adhésions
             const userIds = adhesionsForEvent.map(adhesion => adhesion.userId);
 
             // Récupérer les profilePhoto des utilisateurs correspondants
             const profilePhotos = userIds.map(userId => {
                 const user = allUsers.find(user => user._id.toString() === userId);
                 return user ? user.profilePhoto : null;
             });
 
             // Assigner les profilePhoto à event.subscribers
             event.subscribers = profilePhotos;
             
             event.save();
 
             return event;
         });
         

        res.status(200).json(updatedEvents);
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

        // Récupérer toutes les adhésions
        const allAdhesions = await AdhesionModel.getAllAdh();
        // Récupérer tous les utilisateurs
        const allUsers = await UserModel.getAllUsers();

        // Associer les profilePhoto de chaque utilisateur correspondant à userId dans event.subscribers
        const updatedEvents = events.map(event => {
            // Récupérer les adhésions correspondant à l'événement actuel
            const adhesionsForEvent = allAdhesions.filter(adhesion => adhesion.eventId === event._id.toString());

            // Récupérer les userId des adhésions
            const userIds = adhesionsForEvent.map(adhesion => adhesion.userId);

            // Récupérer les profilePhoto des utilisateurs correspondants
            const profilePhotos = userIds.map(userId => {
                const user = allUsers.find(user => user._id.toString() === userId);
                return user ? user.profilePhoto : null;
            });

            // Assigner les profilePhoto à event.subscribers
            event.subscribers = profilePhotos;
            
            event.save();

            return event;
        });
        

        res.status(200).json(updatedEvents);
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
        const page = parseInt(req.query.page as string, 10) || 1; // Page par défaut: 1
        const limit = parseInt(req.query.limit as string, 10) || 4; // Limite par défaut: 10
        const events = await EventModel.getEventsByUserId(userId, page, limit);

        // Récupérer toutes les adhésions
        const allAdhesions = await AdhesionModel.getAllAdh();
        // Récupérer tous les utilisateurs
        const allUsers = await UserModel.getAllUsers();

        // Associer les profilePhoto de chaque utilisateur correspondant à userId dans event.subscribers
        const updatedEvents = events.map(event => {
            // Récupérer les adhésions correspondant à l'événement actuel
            const adhesionsForEvent = allAdhesions.filter(adhesion => adhesion.eventId === event._id.toString());

            // Récupérer les userId des adhésions
            const userIds = adhesionsForEvent.map(adhesion => adhesion.userId);

            // Récupérer les profilePhoto des utilisateurs correspondants
            const profilePhotos = userIds.map(userId => {
                const user = allUsers.find(user => user._id.toString() === userId);
                return user ? user.profilePhoto : null;
            });

            // Assigner les profilePhoto à event.subscribers
            event.subscribers = profilePhotos;
            
            event.save();

            return event;
        });
        
        res.status(200).json(updatedEvents)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des événements.", error: error.message })
    }
};





