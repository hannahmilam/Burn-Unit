import { ProxyState } from '../AppState.js'

export class Post {
  constructor(postData) {
    this.postId = postData.id
    this.creatorId = postData.creatorId
    this.img = postData.img
    this.tag = postData.tag
    this.likes = postData.likes
  }

  get Template() {
    return /* html */ `
    <div class="p-3">
        <div class="card">
          <div class="card-header text-center">
            <img src="${this.img}" alt="post image"
              class="rounded img-fluid ">
              <div class="pt-3">
            <i class="far fa-heart selectable" onclick="app.postsController.likePost('${this.postId}')"></i> <span>${this.likes.length}</span>
            <i class="far fa-comment selectable"></i> <span>${this.CommentsCount}</span>
            <i class="fas fa-minus-circle selectable ps-4  ${this.creatorId === ProxyState.account.id ? '' : 'visually-hidden'}" onclick="app.postsController.removePost('${this.postId}')"></i>
          </div>
          </div>
          <div class="card-body" id="topComment">
          </div>

          <div class="card-footer" id="comments">
          <form onsubmit="app.commentsController.createComment('${this.postId}')">
              <label for="description" class=""></label>
              <input type="text" name="description" id="comment" placeholder="add comment" class="form-control"  required>
              <button type="submit" class="btn btn-secondary p-2 m-5">Submit</button>
          </form>
         ${this.Comments}
          </div>
          </div>
        </div>
      </div>
    `
  }

  get Comments() {
    let template = ''
    const foundComments = ProxyState.comments.filter(c => c.postId === this.postId)
    foundComments.forEach(c => { template += c.CommentTemplate })
    return template
  }

  get CommentsCount() {
    let totalCount = 0
    const foundComments = ProxyState.comments.filter(c => c.postId === this.postId)
    totalCount = foundComments.length
    return (totalCount)
  }
}
