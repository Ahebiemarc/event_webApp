import express = require('express');
import { hashedPwd, random } from '../helpers/utils';
import { UserModel } from '../models/User';


export const registerUserController = async (req: express.Request, res: express.Response) => {
    try {
        const { email , username, number, password } = req.body;

        const salt = random();

        const hashedPassword = hashedPwd(salt, password);

        console.log(email, username, number, password);
        //console.log(salt);
        console.log(hashedPassword);
        
        
        

        if (typeof email !== 'string' || typeof username !== 'string' || typeof number !== 'number' || typeof password !== 'string') {
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
            number,
            authentication:{
                password: hashedPassword,
                salt,

            }
        });

        res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};