import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY



export const hashedPwd = (salt: string, password: string): string => {
  const hash = crypto.createHash('sha256');
  hash.update(password + salt + SECRET_KEY);
  return hash.digest('hex');
};

export const random = () => crypto.randomBytes(128).toString('base64');



// Fonction pour générer un token JWT
export const generateToken = (userId: string): string => {
  // Créez un token JWT avec l'ID de l'utilisateur comme payload
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' }); // Vous pouvez ajuster la durée de validité selon vos besoins
};

// Fonction pour valider et extraire l'ID utilisateur à partir d'un token JWT
export const getUserIdFromToken = (token: string): string | null => {
  try {
      const decodedToken = jwt.verify(token, SECRET_KEY) as { userId: string };
      return decodedToken.userId;
  } catch (error) {
      // Si le token est invalide ou expiré, retournez null
      return null;
  }
};