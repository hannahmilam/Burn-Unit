import { dbContext } from '../db/DbContext.js'
import { BadRequest } from '../utils/Errors.js'

class CommentsService {
  async getComments(postId) {
    const comments = await dbContext.Comments.find({ postId })
    return comments
  }

  async getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) {
      throw new BadRequest('Invalid commentId')
    }
    return comment
  }

  async createComment(cData) {
    const comment = await dbContext.Comments.create(cData)
    return comment
  }

  async editComment(commentId, cData) {
    const comment = await this.getCommentById(commentId)

    comment.description = cData.description || comment.description
    comment.postId = cData.postId || comment.postId

    await comment.save()
    return comment
  }

  async removeComment(commentId) {
    const comment = await this.getCommentById(commentId)
    await comment.delete()
    return comment
  }
}
export const commentsService = new CommentsService()
