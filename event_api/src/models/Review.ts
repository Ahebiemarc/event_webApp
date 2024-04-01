import mongoose, {Model, Document} from "mongoose";

interface IReviewDocument extends Document {
    title: string;
    description: string;
    date: Date;
    userId: string;
    eventId: string;
}

type ReviewDataProps = {
    title: string;
    description: string;
    date: Date;
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
    userId: { type: String, required: true },
    eventId: { type: String, required: true }
})