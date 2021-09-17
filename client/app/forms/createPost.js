export function getCreatePostTemplate(postData) {
  postData = postData || {
    img: '',
    tag: ''
  }
  return /* html */`
  <form class="rounded p-3 shadow" onsubmit="app.postsController.createPost()" id="post-form">
  <input id="postId" value="${postData.id}" class="visually-hidden"/>

  <label for="img" class="">Image: </label>
  <input id="img" value="${this.img}" type="text" class="form-control" name="img" required>

  <label for="tag" class="">Tag: </label>
  <select name="tag" id="tag" value="${this.tag}" required class="form-control">
  <option disabled selected value="">#</option> 
  <option>Celebrities</option>
  <option>Normies</option>
</select>
    `
}
