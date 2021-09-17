export function getCreatePostTemplate(postData) {
  postData = postData || {
    img: '',
    tag: ''
  }
  return /* html */`
  
  <form class="rounded p-3 shadow" id="post-form" onsubmit="app.postsController.createPost()">
  <input id="postId" value="${postData.id}" class="visually-hidden"/>

  <label for="img" class="">Image: </label>
  <input id="img" value="img" type="text" class="form-control" name="img" required>

  <label for="tag" class="">Tag: </label>
  <select name="tag" id="tag" value="tag" required class="form-control">
  <option disabled selected value="">#</option> 
  <option>Celebrities</option>
  <option>Normies</option>
</select>
<button class="btn btn-secondary p-2 m-5">Submit</button>
</form>
    `
}
