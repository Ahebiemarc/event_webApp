import  multer from "multer";
import path from "path";

const storageImgProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/images/"); // Spécifiez le chemin du dossier pour stocker les images
    },
    filename: (req, file, cb) => {
        // Utilisez la date actuelle et le nom d'origine du fichier pour créer un nom de fichier unique
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const storageImgEvent = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/events/"); // Spécifiez le chemin du dossier pour stocker les images
    },
    filename: (req, file, cb) => {
        // Utilisez la date actuelle et le nom d'origine du fichier pour créer un nom de fichier unique
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req: Express.Request , file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Acceptez seulement les fichiers jpg et png
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
        // Utilisez un cast pour indiquer que votre erreur est conforme au type attendu
        cb(new Error('Type de fichier non pris en charge') as any, false);
    }
};

export const uploadImgProfile = multer({
    storage: storageImgProfile,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limite de taille de fichier à 5MB
    },
    fileFilter: fileFilter
})

export const uploadImgEvent = multer({
    storage: storageImgProfile,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limite de taille de fichier à 5MB
    },
    fileFilter: fileFilter
})

