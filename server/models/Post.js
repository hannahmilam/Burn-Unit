import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const LikesSchema = new Schema([
  { creatorId: { type: Schema.Types.ObjectId, ref: 'Account' } },
  { value: { type: Number, default: 0, enum: [1, -1, 0] } }
])
export const PostSchema = new Schema(
  {
    img: { type: String, required: true },
    tag: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    likes: [LikesSchema]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

PostSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
