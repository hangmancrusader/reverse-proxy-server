import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  password: string; // hashed
  createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
