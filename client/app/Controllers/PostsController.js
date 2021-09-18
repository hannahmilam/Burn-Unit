import { ProxyState } from '../AppState.js'
import { getCreatePostTemplate } from '../forms/createPost.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'

function _drawPosts() {
  let template = ''
  ProxyState.posts.forEach(p => { template += p.Template })
  document.getElementById('posts').innerHTML = template
}
export class PostsController {
  constructor() {
    ProxyState.on('posts', _drawPosts)
    this.getPosts()
    ProxyState.on('comments', _drawPosts)
    ProxyState.on('account', _drawPosts)
  }

  async getPosts() {
    try {
      await postsService.getPosts()
    } catch (error) {
      logger.log('⚠ GET_POSTS', error)
    }
  }

  async createPost() {
    // eslint-disable-next-line no-undef
    event.preventDefault()
    /**
    * @type{HTMLFormElement}
    */
    // @ts-ignore
    // eslint-disable-next-line no-undef
    const form = event.target

    const postData = {
      img: form.img.value,
      tag: form.tag.value,
      postId: form.postId.value
    }
    try {
      // if (form.postId.value) {
      //   await postsService.editPost(form.postId.value, postData)
      // } else {
      await postsService.createPost(postData)
      // eslint-disable-next-line no-undef
      $('#formsModal').modal('toggle')
    } catch (error) {
      logger.log('⚠ POST_DATA', error)
    }
    form.reset()
  }

  async editPost(postId) {
    try {
      await postsService.editPost(postId)
    } catch (error) {
      logger.log('⚠ EDIT_POST', error)
    }
  }

  async removePost(postId) {
    try {
      await postsService.removePost(postId)
    } catch (error) {
      logger.log('⚠ REMOVE_POST', error)
    }
  }

  showCreatePostForm(postId) {
    const post = ProxyState.posts.find(p => p.postId === postId)
    document.getElementById('modal-body').innerHTML = getCreatePostTemplate(post)
  }

  async likePost(postId) {
    try {
      await postsService.likePost(postId)
    } catch (error) {
      logger.log('⚠ LIKE_POST', error)
    }
  }
}
