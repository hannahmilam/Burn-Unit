import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService.js'
import BaseController from '../utils/BaseController.js'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getPosts)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .put('/:postId', this.editPost)
  }

  async getPosts(req, res, next) {
    try {
      const posts = await postsService.getPosts(req.query)
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async createPost(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const post = await postsService.createPost(req.body)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async editPost(req, res, next) {
    try {
      const post = await postsService.editPost(req.params.postId, req.body)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }
}
