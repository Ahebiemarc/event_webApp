import mongoose, {Document, Model, Schema} from "mongoose";
import { ReviewDataProps } from "./Review";




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
    findEventPrice(price: number | string): Promise<IEventDocument[] | null>;
    findEventByDate(date: string): Promise<IEventDocument[] | null>;
    findEventByLocation(location: string): Promise<IEventDocument[] | null>;
    deleteEventById(eventId: string): Promise<IEventDocument>;
    updateEvent(eventId: EventDataProps, eventData: Partial<EventDataProps>): Promise<IEventDocument | null>;
    getAllEvents(): Promise<IEventDocument[] | null>;
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
    return this.find({title}).sort({date: -1}).exec();
}

EventSchema.statics.findEventPrice = function(price: number | string){
    return this.find({price}).sort({date: -1}).exec();
}
EventSchema.statics.findEventByDate = function(date: Date){
    return this.find({date}).sort({date: -1}).exec();
}

EventSchema.statics.findEventByLocation = function(location: string){
    return this.find({location}).sort({date: -1}).exec();
}

EventSchema.statics.getAllEvents = function() {
    return this.find().sort({date:-1}).exec();
};



// Modèle évènement 
export const EventModel = mongoose.model<IEventDocument, IEventModel>('Event', EventSchema)