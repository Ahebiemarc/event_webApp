import mongoose, { Document, Model } from 'mongoose';

interface UserDocument extends Document {
  email: string;
  username: string;
  number: number;
  authentication: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
}

type userDataProps = {
    email: string;
    username: string;
    number: number;
    authentication: {
    password: string;
    salt: string;
  };
}

interface UserModel extends Model<UserDocument> {
  getUserByUsername(username: string): Promise<UserDocument | null>;
  getUserByEmail(email: string): Promise<UserDocument | null>;
  createUser(userData: userDataProps): Promise<UserDocument>;
}

const UserSchema = new mongoose.Schema<UserDocument, UserModel>({
  email: { type: String, required: true, unique: true},
  username: { type: String, required: true, unique: true},
  number: { type: Number, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

UserSchema.statics.getUserByUsername = function (username: string) {
  return this.findOne({ username });
};

UserSchema.statics.getUserByEmail = function (email: string) {
  return this.findOne({ email });
};

UserSchema.statics.createUser = function (userData: userDataProps) {
  return this.create(userData);
};

export const UserModel = mongoose.model<UserDocument, UserModel>('User', UserSchema);
