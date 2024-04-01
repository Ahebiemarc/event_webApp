import mongoose, {Document, Model} from "mongoose";



interface IEventDocument extends Document{
    title: string;
    description: string;
    date: Date;
    location: string;
    creator_id: string;
    photo: string;
    reviews_id?: string[];
}

type EventDataProps = {
    title: string;
    description: string;
    date: Date;
    location: string;
    creator_id: string;
    photo: string;
    reviews_id?: string[];
}

interface IEventModel extends Model<IEventDocument>{
    createEvent(eventData: EventDataProps): Promise<IEventDocument>;
    getEventById(eventId: string): Promise<IEventDocument | null>;
    getEventByTitle(title: string): Promise<IEventDocument[] | null>;
    getEventByDate(date: Date): Promise<IEventDocument[] | null>;
    getEventByLocation(location: string): Promise<IEventDocument[] | null>;
}

const EventSchema = new mongoose.Schema<IEventDocument, IEventModel>({
    title: { type: String, required: true,},
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    creator_id: { type: String, required: true },
    photo: { type: String, required: true },
    reviews_id: { type: [String] }
})