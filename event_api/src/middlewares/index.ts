import {Request, Response, NextFunction} from 'express'
import { getUserIdFromToken } from '../helpers/utils';
import { UserModel } from '../models/User';

// Déclaration de la nouvelle interface pour étendre Request
declare global {
    namespace Express{
        interface Request{
            userId?: string;
            isAdminId?: string;
        }
    }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction ) => {
    const sessionToken = req.cookies['MARKUS-AUTH'];

    if(!sessionToken){
        return res.status(401).json({ message: "Non authentifié. Veuillez vous connecter." });
    }

    const userId = getUserIdFromToken(sessionToken);
    if(!userId){
        return res.status(401).json({ message: "Token de session invalide. Veuillez vous connecter." });
    }

    req.userId = userId;

    return next();
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction)=>{

    const userId = req.userId;

    const user =  await UserModel.getUserById(userId);


    if(user.is_admin !== true){
        return res.status(401).json({ message: "Non autorisé." });
    }

    req.isAdminId = userId;
    
    return next();
}
