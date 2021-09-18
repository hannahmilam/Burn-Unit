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
    <div class="col-lg-3 p-3">
        <div class="card shadow">
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
          <div id="comment-list-${this.postId}">
          <form>
          <div class="mb-3">
            <label for="" class="form-label"></label>
            <input type="text" class="form-control" id="">
            <div id="" class="form-text"></div>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
          </div>
          </div>
        </div>
      </div>
    `
  }
}
