import express from 'express';
import  path from 'path';
import { hashedPwd, random } from '../helpers/utils';
import { UserModel } from '../models/User';



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

        console.log(email, username, number, password);
        //console.log(salt);
        console.log(hashedPassword);
        
        
        

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

        const salt = random();
        user.authentication.sessionToken = hashedPwd(salt, user._id.toString());

        await user.save();

        res.cookie('MARKUS-AUTH', user.authentication.sessionToken);
        res.status(201).json({ message: 'Utilisateur connecté avec succès', user }).end();
        
    } catch (error) {
        res.status(500).json({ message:  "Erreur lors de la tentative de connexion", error: error.message });
    }

}