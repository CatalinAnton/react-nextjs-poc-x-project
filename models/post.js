import mongoose, {Schema, model, models} from "mongoose";

const PostSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    msg: {
        type: String,
        required: [true, 'post msg required'],
    },
    tag: {
        type: String,
        required: [true, 'post tag required'],
    }
});

const Post = models.Post || model('Post', PostSchema);

export default Post;
