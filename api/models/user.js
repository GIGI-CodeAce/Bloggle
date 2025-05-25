import mongoose from 'mongoose';
import { type } from 'os';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, minLength: 4, maxLength:15, unique: true },
  password: { type: String, required: true, minLength: 3 },
});

const User = model('User', UserSchema);
export default User;
