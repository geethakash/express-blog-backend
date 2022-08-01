import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export type UserDocument = mongoose.Document & {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  followers: string[];
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
};

const UserSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
    default: '',
  },
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  // :TODO: use bcrypt.genSalt() to generate a salt
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
