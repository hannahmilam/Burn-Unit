import { ProxyState } from '../AppState.js'
import { Comment } from '../Models/Comment.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class CommentsService {
  async getComments(postId) {
    const res = await api.get('api/comments')
    logger.log('getComments', res)
    ProxyState.comments = res.data.map(c => new Comment(c))
    logger.log('getComments response', res)
  }

  async postComment(postId) {
    console.log(postId)
    const res = await api.post(`api/comments/${postId}`)
    logger.log(res)
    ProxyState.comments = res.data.map(c => new Comment(c))
  }
}

export const commentsService = new CommentsService()
