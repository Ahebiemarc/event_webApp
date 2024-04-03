import express from 'express';
import { UserModel } from '../models/User';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

// Convertir la fonction fs.unlink en une version asynchrone pour pouvoir l'utiliser avec await
const unlinkAsync = promisify(fs.unlink);




export const deleteUserController = async (req: express.Request, res: express.Response)=>{
    try {
        const userId = req.params.userId;


        //const user = await UserModel.findById(userId);
        /*if(!user){
            return res.status(400).json({ message: "Utilisateur non trouvé." });
        }*/

        if(userId !== req.userId){
            return res.status(400).json({ message: "Action non authorisé" });
        }


        // Supprimer l'utilisateur de la base de données
        const deletedUser = await UserModel.deleteUserById(userId);

        // Supprimer l'image de profil associée à l'utilisateur
        if (deletedUser.profilePhoto) {
            await unlinkAsync(deletedUser.profilePhoto); // Supprime le fichier d'image du système de fichiers
        }
        
        res.clearCookie('MARKUS-AUTH')

        res.status(200).json({ message: 'Compte utilisateur supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du compte utilisateur.", error: error.message })
    }
}

export const getAllUsersController = async (req: express.Request, res: express.Response) =>{
    try {

        const users = await UserModel.getAllUsers();
        
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs.", error: error.message })
    }
}

export const getUserController = async (req: express.Request, res: express.Response) =>{
    try {

        const {userId} = req.params;
        const userIdToken = req.userId;
        if (userId !== userIdToken) {
            return res.status(400).json({ message: "Action non authorisé" });
        }

        const user = await UserModel.getUserById(userId);
        
        res.status(200).json( user);
        
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateurs.", error: error.message })
        
    }
}

export const updateUserController = async (req: express.Request, res: express.Response) =>{
    try {

        const userIdToken = req.userId;
        const {userId} = req.params;

        const user = await UserModel.getUserById(userId)
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        if (userId !== userIdToken) {
            return res.status(400).json({ message: "Action non authorisé" });
        }

        const userData = req.body;
        const newPhotoPath = req.file ? req.file.path : null;
        const correctPhotoPath = newPhotoPath ? newPhotoPath.split(path.sep).join("/") : null

        // Si une nouvelle photo est fournie et l'ancienne photo existe, supprimez l'ancienne photo
        if (correctPhotoPath && user.profilePhoto) {
            await unlinkAsync(user.profilePhoto);
        }
        
        // Mettre à jour l'événement avec les nouvelles données
        const updatedEvent = await UserModel.updateUser(user, userData);
        if(correctPhotoPath) {
            updatedEvent.profilePhoto = correctPhotoPath
        }
        await updatedEvent.save();

        if (!updatedEvent) {
            return res.status(404).json({ message: "Événement non sauvegardé." });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'événement.", error: error.message });
    }
}

