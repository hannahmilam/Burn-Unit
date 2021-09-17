import { ProxyState } from '../AppState.js'
import { Comment } from '../Models/Comment.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class CommentsService {
  async getComments(postId) {
    const res = await api.get(`api/comments/${postId}`)
    logger.log('getComments', res)
    ProxyState.comments = res.data.map(c => new Comment(c))
    logger.log('getComments response', res)
  }
}

export const commentsService = new CommentsService()
