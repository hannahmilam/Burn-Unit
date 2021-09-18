import { ProxyState } from '../AppState.js'

export class Post {
  constructor(postData) {
    this.postId = postData._id
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
              <div class="d-flex justify-content-around pt-3">
            <i class="far fa-heart selectable" onclick="app.postsController.likePost()"></i><span id="likesCounter"></span>
            <i class="far fa-comment selectable" onclick="app.commentsController.getComments('${this.postId}')"></i><span id="commentCounter"></span>
            <i class="fas fa-minus-circle selectable" onclick="app.postsController.removePost('${this.postId}')"></i>
          </div>
          </div>
          <div class="card-body" id="topComment">
          <form>
            <div class="mb-3">
              <label for="" class="form-label"></label>
              <input type="text" class="form-control" id="">
              <div id="" class="form-text"></div>
              <button type="submit" class="btn btn-primary" onsubmit="app.commentsController.postComment('${this.postId}')">Submit</button>
            </div>
          </form>
        <div id="comment-list-${this.postId}">
        ${this.drawComments()}
          </div>
          </div>
        </div>
      </div>
    `
  }

  drawComments() {
    // this filters selects only the comments that exist for this post
    const comments = ProxyState.comments.filter(c => c.postId === this.id)
    let template = ''
    // the comments.forEach builds out the comments string to be returned
    comments.forEach(c => { template += c.CommentTemplate })
    return template
  }
}
