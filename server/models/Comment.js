import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const LikesSchema = new Schema([
  { creatorId: { type: Schema.Types.ObjectId, ref: 'Account' } },
  { value: { type: Number, default: 0, enum: [1, -1, 0] } }
])

export const CommentSchema = new Schema(
  {
    description: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' },
    likes: [LikesSchema]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('post', {
  localField: 'postId',
  foreignField: '_id',
  ref: 'Post',
  justOne: true
})

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
