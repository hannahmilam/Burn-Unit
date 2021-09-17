import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class PostsService {
  async getPosts(query = {}) {
    const posts = await dbContext.Posts.find(query).populate('creator', 'name picture')
    if (!posts) {
      throw new BadRequest('no matching post')
    }
    return posts
  }

  async createPost(postData) {
    const post = await dbContext.Posts.create(postData)
    if (!post) {
      throw new BadRequest('there is no post')
    }
    return post
  }
}

export const postsService = new PostsService()
