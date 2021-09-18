import { ProxyState } from '../AppState.js'
export class Comment {
  constructor(commentData) {
    this.commentId = commentData._id
    this.creatorId = commentData.creatorId
    this.postId = commentData.postId
    this.description = commentData.description
    // this.likes = commentData.likes
    // this.likeCount = commentData.likeCount
  }

  get CommentTemplate() {
    return /* html */ `
    <p>${this.description} 
     
    <i class="fas fa-minus-circle selectable  ${this.creatorId === ProxyState.account.id ? '' : 'visually-hidden'}" onclick="app.commentsController.removeComment('${this.commentId}')"></i></p>
    `
  }
}
