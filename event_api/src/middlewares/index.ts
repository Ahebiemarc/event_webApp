import {Request, Response, NextFunction} from 'express'
import { getUserIdFromToken } from '../helpers/utils';

// Déclaration de la nouvelle interface pour étendre Request
declare global {
    namespace Express{
        interface Request{
            userId?: string;
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