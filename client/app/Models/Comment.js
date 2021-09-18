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
    <form>
          <div class="mb-3">
            <label for="" class="form-label"></label>
            <input type="text" class="form-control" id="" placeholder="Roast em'">
            <div id="" class="form-text"></div>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    <li><p>${this.description}</p></li>
    `
  }
}
