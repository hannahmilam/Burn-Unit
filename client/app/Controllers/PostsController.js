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
  }

  async getPosts() {
    try {
      await postsService.getPosts()
    } catch (error) {
      logger.log('⚠ GET_POSTS', error)
    }
  }

  async createPost() {
    event.preventDefault()
    /**
    * @type{HTMLFormElement}
    */
    // @ts-ignore
    const form = event.target

    const postData = {
      img: form.img.value,
      tag: form.tag.value
    }
    try {
      if (form.postId.value) {
        await postsService.editPost(form.postId.value, postData)
      } else {
        await postsService.createPost(postData)
      }
    } catch (error) {
      logger.log('⚠ POST_DATA', error)
    }
    form.reset()
  }

  showPosts() {
    _drawPosts()
    document.getElementById('controls').innerHTML = `
    <button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
   Create Post
  </button>
    `
    document.getElementById('modal-body').innerHTML = getCreatePostTemplate(postData)
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

  showEditPostForm(postId) {
    const post = ProxyState.posts.find(p => p.id === postId)
    document.getElementById('modal-body').innerHTML = getCreatePostTemplate(post)
  }
}