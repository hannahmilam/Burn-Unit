import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class CommentsService {
  async getComments(query = {}) {
    const comments = await dbContext.Comments.find(query)
    return comments
  }

  async getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) {
      throw new BadRequest('Invalid commentId')
    }
    return comment
  }

  async editComment(commentId, userId, cData) {
    const comment = await this.getCommentById(commentId)
    if (userId !== comment.creatorId.toString()) {
      throw new Forbidden('You did not make this comment')
    }
    comment.description = cData.description || comment.description
    await comment.save()
    return comment
  }

  async removeComment(commentId) {
    const comment = await this.getCommentById(commentId)
    await comment.delete()
    return comment
  }

  async editLike(commentId, creatorId, value) {
    const comment = await dbContext.Comments.findById(commentId)
    const liked = comment.likes.find(l => l.creatorId.toString() === creatorId)
    if (liked) {
      liked.value = value
    } else {
      comment.likes.push({
        creatorId, value
      })
    }
    await comment.save()
    return comment
  }

  async createComment(cData) {
    const comment = await dbContext.Comments.create(cData)
    if (!comment) {
      throw new BadRequest('there is no comment')
    }
    return comment
  }
}
export const commentsService = new CommentsService()
