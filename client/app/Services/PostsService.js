import { ProxyState } from '../AppState.js'
import { Post } from '../Models/Post.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('getPosts', res)
    ProxyState.posts = res.data.map(p => new Post(p))
    logger.log('getPosts response', res)
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    logger.log('createPost response', res)
    ProxyState.posts = [...ProxyState.posts, new Post(res.data)]
  }

  async editPost(postId, postData) {
    await api.put(`api/posts/${postId}`, postData)
    ProxyState.posts = ProxyState.posts.filter(p => p.postId !== postId)
  }

  async removePost(postId) {
    await api.delete(`api/posts/${postId}`)
    ProxyState.posts = ProxyState.posts.filter(p => p.postId !== postId)
  }
}
export const postsService = new PostsService()
