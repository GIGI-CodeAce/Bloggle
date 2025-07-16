import mongoose from "mongoose";
const {Schema,model} = mongoose;

const PostSchema = new Schema({
  title:{ type: String, minLength: 4, maxLength:44, required: true},
  summary:String,
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  content:String,
  tags: [String],
  cover: Buffer,
  coverType: String,
  author:{type:Schema.Types.ObjectId, ref:'User'},
}, {
  timestamps: true,
});

const PostModel = model('Post', PostSchema);

export default PostModel