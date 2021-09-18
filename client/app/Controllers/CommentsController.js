import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/Logger.js'

// function _drawComments() {
//   let template = ''
//   ProxyState.comments.forEach(c => { template += c.Template })
//   document.getElementById('comments').innerHTML = template
// }

export class CommentsController {
  constructor() {
    this.getComments()
  }

  async getComments() {
    try {
      await commentsService.getComments()
    } catch (error) {
      logger.log('⚠ GET_COMMENTS', error)
    }
  }

  async createComment(postId) {
    // eslint-disable-next-line no-undef
    event.preventDefault()
    /**
     * @type{HTMLFormElement}
     */
    // @ts-ignore
    // eslint-disable-next-line no-undef
    const form = event.target
    const commentData = {
      description: form.description.value
    }
    try {
      commentData.postId = postId
      await commentsService.createComment(commentData)
    } catch (error) {
      logger.log('⚠ CREATE_COMMENT', error)
    }
    form.reset()
  }

  async removeComment(commentId) {
    try {
      await commentsService.removeComment(commentId)
    } catch (error) {
      logger.log('⚠ REMOVE_COMMENT', error)
    }
  }
}
