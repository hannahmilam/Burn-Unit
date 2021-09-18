import { ProxyState } from '../AppState.js'
import { Comment } from '../Models/Comment.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class CommentsService {
  async getComments() {
    const res = await api.get('api/comments')
    logger.log('getComments', res)
    ProxyState.comments = res.data.map(c => new Comment(c))
    logger.log('getComments response', res)
  }

  async createComment(commentData) {
    logger.log('create comment data', commentData)
    const res = await api.post(`api/comments/${commentData.postId}`, commentData)
    logger.log('createComment response', res)
    ProxyState.comments = [...ProxyState.comments, new Comment(res.data)]
  }

  async removeComment(commentId) {
    await api.delete(`api/comments/${commentId}`)
    ProxyState.comments = ProxyState.comments.filter(c => c.commentId !== commentId)
  }
}

export const commentsService = new CommentsService()
