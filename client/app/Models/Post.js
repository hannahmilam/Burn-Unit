export class Post {
  constructor(postData) {
    this.id = postData.id
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
            <img src="${this.img}" alt="post image" height="150px"
              class="rounded">
            <i class="far fa-heart selected pe-5 pt-3"></i><span id="likesCounter"></span>
            <i class="far fa-comment selected ps-5 pt-3"></i><span id="commentCounter"></span>
          </div>
          <div class="card-body" id="topComment">
          </div>
        </div>
      </div>
    `
  }
}
