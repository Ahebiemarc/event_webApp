import mongoose, { Document, Model } from 'mongoose';

interface IUserDocument extends Document {
  email: string;
  username: string;
  number: number;
  authentication: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
  profilePhoto?: string
  is_admin?: boolean;
}

type UserDataProps = {
    email: string;
    username: string;
    number: number;
    authentication: {
    password: string;
    salt: string;
  };
  profilePhoto?: string;
  is_admin?: boolean;

}

interface IUserModel extends Model<IUserDocument> {
  getUserByUsername(username: string): Promise<IUserDocument | null>;
  getUserByEmail(email: string): Promise<IUserDocument | null>;
  createUser(userData: UserDataProps): Promise<IUserDocument>;
  deleteUserById(userId: string): Promise<IUserDocument>;
  getUserById(userId: string): Promise<IUserDocument | null>
  
}

const UserSchema = new mongoose.Schema<IUserDocument, IUserModel>({
  email: { type: String, required: true, unique: true},
  username: { type: String, required: true, unique: true},
  number: { type: Number, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  profilePhoto: { type: String, required: false},
  is_admin: { type: Boolean, required: true, default: false},
});

UserSchema.statics.getUserByUsername = function (username: string) {
  return this.findOne({ username })
  // Sélectionnez les champs d'authentification, y compris le sel et le mot de passe
  .select('+authentication.salt +authentication.password')
  // Exécutez la requête et retournez la promesse résultante
  .exec();
};


UserSchema.statics.getUserById = function (userId: string) {
  return this.findOne({ _id: userId})
  // Sélectionnez les champs d'authentification, y compris le sel et le mot de passe
  .select('+authentication.salt +authentication.sessionToken')
  // Exécutez la requête et retournez la promesse résultante
  .exec();
};

UserSchema.statics.getUserByEmail = function (email: string) {
  return this.findOne({ email });
};

UserSchema.statics.createUser = function (userData: UserDataProps) {
  return this.create(userData);
};

UserSchema.statics.deleteUserById = function (userId: string) {
  return this.findByIdAndDelete(userId).exec();
};

export const UserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
