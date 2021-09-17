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
    <input type="text" placeholder="Rost em'">
    <li><p>${this.description}</p></li>
    `
  }
}