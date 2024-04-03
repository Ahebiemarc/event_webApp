import mongoose, {Model, Document} from "mongoose";

interface IReviewDocument extends Document {
    title: string;
    description: string;
    date: Date;
    note: number;
    userId: string;
    eventId: string;
}

export type ReviewDataProps = {
    title: string;
    description: string;
    date: Date;
    note: number;
    userId: string;
    eventId: string;
}

interface IReviewModel extends Model<IReviewDocument>{
    createReview: (reviewData: ReviewDataProps) => Promise<IReviewDocument>;
    getReviewsByEventId: (eventId: string) => Promise<IReviewDocument[]>;
    getReviewById: (reviewId: string) => Promise<IReviewDocument | null>;

}

const ReviewSchema = new mongoose.Schema<IReviewDocument, IReviewModel>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    note: {type: Number, required: true},
    userId: { type: String, required: true },
    eventId: { type: String, required: true }
});

ReviewSchema.statics.createReview = function(reviewData: ReviewDataProps){
    return this.create(reviewData);
}

ReviewSchema.statics.getReviewsByEventId = function(eventId: string){
    return this.find({eventId}).sort({date: -1}).exec();
}

ReviewSchema.statics.getReviewById = function(reviewId: string){
    return this.findById(reviewId).exec();
}


export const ReviewModel = mongoose.model<IReviewDocument, IReviewModel>('Review', ReviewSchema);