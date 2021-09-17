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

  async editPost(postId, postData) {
    const post = await this.getPostById(postId)
    post.img = postData.img || post.img
    await post.save()
    return post
  }

  async getPostById(postId) {
    const post = await dbContext.Posts.findById(postId)
    if (!post) {
      throw new BadRequest('invalaid postId')
    }
    return post
  }

  async removePost(postId) {
    const post = await this.getPostById(postId)
    await post.delete()
    return post
  }
}

export const postsService = new PostsService()
