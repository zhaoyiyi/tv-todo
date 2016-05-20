import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
  id: String,
  lastWatched: Number
});

const userSchema = new mongoose.Schema({
  email: String,
  shows: [showSchema]
});



const User = mongoose.model('User', userSchema);

export default User;
