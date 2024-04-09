import mongoose, {Document, Model, Query, Schema} from "mongoose";
import { ReviewDataProps } from "./Review";


const extractDigits = (value: string): string => {
    const digits = value.replace(/\D/g, ''); // Remplace tous les caractères non numériques par une chaîne vide
    return digits.length > 0 ? digits : value; // Si des chiffres ont été trouvés, retourne les chiffres, sinon retourne la chaîne d'origine
};


interface IEventDocument extends Document{
    title: string;
    description: string;
    price: number | string
    date: string;
    location: string;
    creator_id: string;
    photo: string;
    reviews?: ReviewDataProps[];
}

type EventDataProps = {
    title: string;
    description: string;
    price: number | string;
    date: string;
    location: string;
    creator_id: string;
    photo: string;
}

interface IEventModel extends Model<IEventDocument>{
    createEvent(eventData: EventDataProps): Promise<IEventDocument>;
    getEventById(eventId: string): Promise<IEventDocument | null>;
    findEvent(filter: any): Promise<IEventDocument[] | null>;
    findEventByTitle(title: string): Promise<IEventDocument[] | null>;
    findEventByPrice(price: number | string): Promise<IEventDocument[] | null>;
    findEventByDate(date: string): Promise<IEventDocument[] | null>;
    findEventByLocation(location: string): Promise<IEventDocument[] | null>;
    deleteEventById(eventId: string): Promise<IEventDocument>;
    updateEvent(eventId: EventDataProps, eventData: Partial<EventDataProps>): Promise<IEventDocument | null>;
    getAllEvents(): Promise<IEventDocument[] | null>;
    getEventsWithLimit(limit: number): Query<IEventDocument[], IEventDocument>;
    getEventsWithPagination(page: number, limit: number): Query<IEventDocument[], IEventDocument>;
    getEventsByUserId(userId: string): Promise<IEventDocument[] | null>;
    getAllEventTags(): Query<string[], null>;
    findUniqueEvents(eventTitle: string, eventLocation: string, eventPrice: string | number): Promise<IEventDocument[] | null>;
}

const EventSchema = new mongoose.Schema<IEventDocument, IEventModel>({
    title: { type: String, required: true,},
    description: { type: String, required: true },
    price: {type: Schema.Types.Mixed, required: true},
    date: { type: String, required: true },
    location: { type: String, required: true },
    creator_id: { type: String, required: true },
    photo: { type: String, required: true },
    reviews: [{ type: Object }] // tableau de reviews
});

// méhode static pour le modèle de l'évènement

EventSchema.statics.createEvent = function (eventData: EventDataProps) {
    return this.create(eventData);
}

EventSchema.statics.getEventById = function(eventId: string) {
    return this.findById(eventId).exec();
};

EventSchema.statics.deleteEventById = function (eventId: string) {
    return this.findByIdAndDelete(eventId).exec();
};

EventSchema.statics.updateEvent = function (event: EventDataProps, eventData: Partial<EventDataProps>) {
    try {
        // Mettre à jour les champs de l'événement avec les nouvelles données
        Object.assign(event, eventData);
        return event;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'événement:", error);
        return null;
    }
};

EventSchema.statics.findEvent = function(filter: any){
    return this.find(filter).sort({date: -1}).exec();
}

EventSchema.statics.findEventByTitle = function(title: string){
    const regex = new RegExp(title, 'i'); // 'i' indique une correspondance insensible à la casse
    return this.find({ title: regex }).sort({ date: -1 }).exec();
}

EventSchema.statics.findEventByPrice = function(price: number | string){
    const priceValue = typeof price === 'number' ? price.toString() : price;
    const processedPrice = extractDigits(priceValue);
    const regex = new RegExp(processedPrice, 'i'); // 'i' indique une correspondance insensible à la casse
    return this.find({ price: regex }).sort({ date: -1 }).exec();
}
EventSchema.statics.findEventByDate = function(date: Date){
    return this.find({date}).sort({date: -1}).exec();
}

EventSchema.statics.findEventByLocation = function(location: string){
    const regex = new RegExp(location, 'i'); // 'i' indique une correspondance insensible à la casse
    return this.find({ location: regex }).sort({ date: -1 }).exec();
}

EventSchema.statics.getAllEvents = function() {
    return this.find().sort({date:-1}).exec();
};

EventSchema.statics.getEventsWithLimit = function(limit: number): Query<IEventDocument[], IEventDocument> {
    return this.find().sort({date:-1}).limit(limit);
};

// Méthode statique pour récupérer les événements avec pagination
EventSchema.statics.getEventsWithPagination = function(page: number, limit: number): Query<IEventDocument[], IEventDocument> {
    const startIndex = (page - 1) * limit;
    return this.find().sort({date:-1}).skip(startIndex).limit(limit);
};

EventSchema.statics.getEventsByUserId = function(userId: string){
    return this.find({creator_id: userId}).sort({date: -1}).exec();
};

EventSchema.statics.getAllEventTags = function() {
    return this.aggregate([
        // Récupérer les valeurs distinctes de chaque champ
        {
            $group: {
                _id: null,
                titles: { $addToSet: "$title" },
                locations: { $addToSet: "$location" },
                prices: { $addToSet: "$price" }
            }
        },
        // Projet pour concaténer tous les tableaux dans un seul tableau
        {
            $project: {
                _id: 0,
                allData: {
                    $concatArrays: ["$titles", "$locations", "$prices"]
                }
            }
        }
    ]).exec();
};

EventSchema.statics.findUniqueEvents = async function(title: string, location: string, price: number | string) {
    const titleEvents = await this.findEventByTitle(title);
    const locationEvents = await this.findEventByLocation(location);
    const priceEvents = await this.findEventByPrice(price);

    // Combine les résultats de recherche
    const allEvents = [...titleEvents, ...locationEvents, ...priceEvents];

    // Utilisez un ensemble pour supprimer les doublons basés sur l'ID
    const uniqueEvents = Array.from(new Set(allEvents.map(event => event._id.toString())))
        .map(eventId => allEvents.find(event => event._id.toString() === eventId));

    return uniqueEvents;
}





// Modèle évènement 
export const EventModel = mongoose.model<IEventDocument, IEventModel>('Event', EventSchema)