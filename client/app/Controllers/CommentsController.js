import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/Logger.js'

// function _drawTopComment(){
//   document.getElementById('topComment').innerHTML =
// }
function _drawComments() {
  let template = ''
  ProxyState.comments.forEach(c => { template += c.CommentTemplate })
  document.getElementById('comment-list-' + ProxyState.comments[0].postId).innerHTML = template
}

export class CommentsController {
  constructor() {
    ProxyState.on('comments', _drawComments)
    this.getComments()
  }

  async getComments(postId) {
    try {
      await commentsService.getComments(postId)
      // _drawComments()
    } catch (error) {
      logger.log('error caught in getComments function in controller')
    }
  }
}
