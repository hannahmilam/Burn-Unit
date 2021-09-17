import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    description: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
CommentSchema.index({ postId: 1, creatorId: 1 }, { unique: true })

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