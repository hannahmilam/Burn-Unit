import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/Logger.js'

// function _drawTopComment(){
//   document.getElementById('topComment').innerHTML =
// }

export class CommentsController {
  constructor() {
    this.getComments()
  }

  async getComments(postId) {
    try {
      await commentsService.getComments(postId)
    } catch (error) {
      logger.log(error)
    }
  }

  async postComment(postId) {
    try {
      // @ts-ignore
      event.preventDefault()
      debugger
      await commentsService.postComment(postId)
    } catch (error) {
      console.error(error)
    }
  }
}
