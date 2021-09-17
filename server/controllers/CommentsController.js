import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService.js'
import BaseController from '../utils/BaseController.js'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('/:postId', this.getComments)
      .get('/:commentId', this.getCommentById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/:postId', this.createComment)
      .put('/:commentId', this.editComment)
      .delete('/:commentId', this.removeComment)
      .put('/:commentId/likes', this.editLike)
  }

  async getComments(req, res, next) {
    try {
      const comments = await commentsService.getComments()
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getCommentById(req, res, next) {
    try {
      const comment = await commentsService.getCommentById(req.params.postId)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      const comment = await commentsService.editComment(req.params.commentId, req.userInfo.id, req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async removeComment(req, res, next) {
    try {
      const post = await commentsService.removeComment(req.params.commentId)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async editLike(req, res, next) {
    try {
      const comment = await commentsService.editLike(req.params.postId, req.userInfo.id, req.body.value)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}
