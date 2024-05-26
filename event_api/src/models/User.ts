import mongoose, { Document, Model } from 'mongoose';

interface IUserDocument extends Document {
  email: string;
  username: string;
  number: string;
  authentication: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
  profilePhoto?: string;
  is_admin?: boolean;
  sold: number;
}

type UserDataProps = {
    email: string;
    username: string;
    number: string;
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
  updateUser(eventId: IUserDocument, eventData: Partial<UserDataProps>): Promise<IUserDocument | null>;
  getUserById(userId: string): Promise<IUserDocument | null>
  getAllUsers(): Promise<IUserDocument[] | null>;
  subtractSoldValue (userId: string, value: number): Promise<IUserDocument | null>
  
  
}

const UserSchema = new mongoose.Schema<IUserDocument, IUserModel>({
  email: { type: String, required: true, unique: true},
  username: { type: String, required: true, unique: true},
  number: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  profilePhoto: { type: String, required: false},
  is_admin: { type: Boolean, required: true, default: false},
  sold: { type: Number, required: true, default: 100},
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
  return this.findOne({ email }).exec();
};

UserSchema.statics.createUser = function (userData: UserDataProps) {
  return this.create(userData);
};

UserSchema.statics.updateUser = function (user: IUserDocument, userData: Partial<UserDataProps>) {
  try {
      // Mettre à jour les champs de l'événement avec les nouvelles données
      Object.assign(user, userData);
      return user;
  } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      return null;
  }
};

UserSchema.statics.deleteUserById = function (userId: string) {
  return this.findByIdAndDelete(userId).exec();
};

UserSchema.statics.getAllUsers = function () {
  return this.find().exec();
}

UserSchema.statics.subtractSoldValue = async function(userId: string, value: number): Promise<IUserDocument | null> {
  try {
    const user = await this.findById(userId);
    if (!user) {
      return null;
    }

    if (user.sold >= value) {
      user.sold -= value;
      await user.save();
      return user;
    } else {
      console.log(`La valeur de sold (${user.sold}) est inférieure à la valeur à soustraire (${value}). Aucune soustraction effectuée.`);
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la soustraction de la valeur vendue :", error);
    return null;
  }
};


export const UserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
