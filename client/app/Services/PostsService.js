import { ProxyState } from '../AppState.js'
import { Post } from '../Models/Post.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('getPosts', res)
    ProxyState.posts = res.data.map(p => new Post(p))
    logger.log('getPosts response', ProxyState.posts)
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

  async likePost(postId) {
    logger.log('likes post', postId)
    const res = await api.put(`api/posts/${postId}/likes`, { value: 1 })
    const i = ProxyState.posts.findIndex(p => p.postId === postId)
    ProxyState.posts.splice(i, 1, new Post(res.data))
    ProxyState.posts = [...ProxyState.posts]
  }
  // NOTE this function takes the array of posts. find index takes the position you are in the array, then removes(with the splice) that item and replace it with itself with its updated data and keeps it in its same position in the array.
}
export const postsService = new PostsService()
