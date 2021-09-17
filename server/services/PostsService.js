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

  async getPostById(postId) {
    const post = await dbContext.Posts.findById(postId)
    if (!post) {
      throw new BadRequest('invalaid postId')
    }
    return post
  }

  async createPost(postData) {
    const post = await dbContext.Posts.create(postData)
    if (!post) {
      throw new BadRequest('there is no post')
    }
    return post
  }

  //   TODO we need to fix editPost, it is giving 403 error
  async editPost(postId, userId, postData) {
    const post = await this.getPostById(postId)
    if (userId !== post.creatorId.toString()) {
      throw new Forbidden('You did not make this post')
    }
    post.img = postData.img || post.img
    await post.save()
    return post
  }

  async removePost(postId, userId) {
    const post = await this.getPostById(postId)
    if (userId !== post.creatorId.toString()) {
      throw new Forbidden('You did not create this post')
    }
    await post.delete()
    return post
  }

  async editLike(postId, creatorId, value) {
    const post = await dbContext.Posts.findById(postId)
    const liked = post.likes.find(l => l.creatorId.toString() === creatorId)
    if (liked) {
      liked.value = value
    } else {
      post.likes.push({
        creatorId, value
      })
    }
    await post.save()
    return post
  }
}

export const postsService = new PostsService()
