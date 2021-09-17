import { dbContext } from '../db/DbContext.js'
import { BadRequest } from '../utils/Errors.js'

class CommentsService {
  async getComments(postId) {
    const comments = await dbContext.Comments.find({ postId })
    return comments
  }

  async getCommentById()
}
export class commentsService = new CommentsService()
