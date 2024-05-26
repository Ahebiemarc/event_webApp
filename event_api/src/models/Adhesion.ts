import mongoose, {Model, Document} from "mongoose";

interface IAdhesionDocument extends Document {
    eventId: string;
    userId: string;
    date: Date;
    price: number;
}

export type AdhesionDataProps = {
    eventId: string;
    userId: string;
    price: number;
    //date: Date;
}

interface IAdhesionModel extends Model<IAdhesionDocument>{
    createAdh: (AdhesionData: AdhesionDataProps) => Promise<IAdhesionDocument>;
    getAdhByEventId: (eventId: string) => Promise<IAdhesionDocument[]>;
    getAllAdh: () => Promise<IAdhesionDocument[]>;

}

const ReviewSchema = new mongoose.Schema<IAdhesionDocument, IAdhesionModel>({
    eventId: { type: String, required: true },
    userId: { type: String, required: true },
    date: { type: Date, required: true, default: new Date()},
    price: { type: Number },
});

ReviewSchema.statics.createAdh = function(AdhesionData: AdhesionDataProps){
    return this.create(AdhesionData);
}

ReviewSchema.statics.getAdhByEventId = function(eventId: string){
    return this.find({eventId}).sort({date: -1}).exec();
}

ReviewSchema.statics.getAllAdh = function(){
    return this.find().exec();
}



export const AdhesionModel = mongoose.model<IAdhesionDocument, IAdhesionModel>('Adhesion', ReviewSchema);