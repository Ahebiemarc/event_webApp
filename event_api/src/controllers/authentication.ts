import express from 'express';
import  path from 'path';
import { hashedPwd, random, generateToken, getUserIdFromToken } from '../helpers/utils';
import { UserModel } from '../models/User';
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

export const registerUserController = async (req: express.Request, res: express.Response) => {
    try {
        const { email , username, number, password } = req.body;
        const profilePhotoPath = req.file ? req.file.path : "";
        let correctPhotoPath = ""

        if (profilePhotoPath !== ""){
            correctPhotoPath = profilePhotoPath.split(path.sep).join("/")
        }

        const numberConvert = Number(number);

        const salt = random();

        const hashedPassword = hashedPwd(salt, password);

        //console.log(email, username, number, password);
        //console.log(salt);
        //console.log(hashedPassword);
        
        
        

        if (typeof email !== 'string' || typeof username !== 'string' || typeof numberConvert !== 'number' || typeof password !== 'string') {
            return res.status(400).json({ message: "Les données reçues sont invalides." });
        };



        // Vérifier si l'email est déjà utilisé
        const existingEmailUser = await UserModel.getUserByEmail(email);
        if (existingEmailUser) {
            return res.status(400).json({ message: "L'email est déjà utilisé." });
        }

        // Vérifier si le nom d'utilisateur est déjà utilisé
        const existingUsername = await UserModel.getUserByUsername( username );
        if (existingUsername) {
            return res.status(400).json({ message: "Le nom d'utilisateur est déjà utilisé." });
        }

        // Créer un nouvel utilisateur
        const newUser = await UserModel.createUser({
            email,
            username,
            number: numberConvert,
            authentication:{
                password: hashedPassword,
                salt,

            },
            profilePhoto: correctPhotoPath
        });

        res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser }).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const loginUserController = async (req: express.Request, res: express.Response) => {
    
    try {
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({ message: "email et password sont réquis" });
        }

        const user = await UserModel.getUserByUsername(username)
        if(!user){
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }
        const expectedHash = hashedPwd(user.authentication.salt, password);

        if(expectedHash !== user.authentication.password){
            return res.status(403).json({ message: "Mot de passe invalide" });
        }

        const sessionToken = generateToken(user._id.toString());

        ///console.log('sessionToken : ', sessionToken);
        

        user.authentication.sessionToken = sessionToken

        await user.save();

        // Définissez la durée d'expiration du cookie en millisecondes (ici 1 heure)
        const maxAge = 3600000; // 1 heure en millisecondes

        res.cookie('MARKUS-AUTH', user.authentication.sessionToken, {maxAge, httpOnly:true});

        // Envoyez le cookie avec le token JWT et spécifiez la durée d'expiration
        res.status(201).json({ message: 'Utilisateur connecté avec succès', user }).end();
        
    } catch (error) {
        res.status(500).json({ message:  "Erreur lors de la tentative de connexion", error: error.message });
    }

}