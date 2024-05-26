import {Request, Response} from 'express';
import { AdhesionModel } from '../models/Adhesion';
import { UserModel } from '../models/User';
import { EventModel } from '../models/Event';



function extractNumbersFromString(str: string): number {
    // Utiliser une expression régulière pour trouver tous les chiffres dans la chaîne
    
    const numbers = str.match(/\d+/g);
  
    // Si des chiffres sont trouvés, les joindre et les convertir en entier
    if (numbers) {
      return parseInt(numbers.join(''), 10);
    }
  
    // Si aucun chiffre n'est trouvé, retourner null
    return 0;
}


export const createAdhesionController = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
    
    const user = await UserModel.findById(userId);

    if (!user) {
        return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const { eventId } = req.params;
    const event = await EventModel.getEventById(eventId);

    if (!event) {
        return res.status(400).json({ message: "Évènement non trouvé" });
    }

    
    const eventPrice = extractNumbersFromString(event.price);
    const rp = await UserModel.subtractSoldValue(user._id, eventPrice)
    if (!rp) {
        return res.status(400).json({ message: "Ton solde est insuffisant" });
    }



    const newAdhesion = await AdhesionModel.createAdh({userId, eventId, price: eventPrice});
    res.status(201).json({ message: "Adhésion créée avec succès" });
    } catch (error) {

        res.status(500).json({ message: "Erreur lors de la création de l'adhésion.", error: error.message })
        
    }
}

export const getAdhesionByeventId = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.eventId
        const adhesion = await AdhesionModel.getAdhByEventId(eventId);
        res.status(200).json(adhesion);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'adhésion.", error: error.message })
    }
}

export const getAllAdhesion = async (req: Request, res: Response) => {
    try {
        const adhesion = await AdhesionModel.getAllAdh();
        res.status(200).json(adhesion);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'adhésion.", error: error.message })
    }
}