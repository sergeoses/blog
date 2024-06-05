document.getElementById('postForm').addEventListener('submit', function(e) {
  e.preventDefault();

  var content = document.getElementById('postContent').value;
  var imageFile = document.getElementById('imageInput').files[0];
  var audioFile = document.getElementById('audioInput').files[0];
  var postsArray = JSON.parse(localStorage.getItem('posts')) || [];

  var newPost = {
    content: content,
    image: imageFile ? URL.createObjectURL(imageFile) : null,
    audio: audioFile ? URL.createObjectURL(audioFile) : null
  };

  postsArray.push(newPost);
  localStorage.setItem('posts', JSON.stringify(postsArray));

  addPostToPage(newPost);
});

window.onload = function() {
  var postsArray = JSON.parse(localStorage.getItem('posts')) || [];
  postsArray.forEach(addPostToPage);
};

function addPostToPage(post) {
  var postElement = document.createElement('div');
  postElement.classList.add('post');

  var contentElement = document.createElement('p');
  contentElement.textContent = post.content;
  postElement.appendChild(contentElement);

  if (post.image) {
    var imageElement = document.createElement('img');
    imageElement.src = post.image;
    postElement.appendChild(imageElement);
  }

  if (post.audio) {
    var audioElement = document.createElement('audio');
    audioElement.controls = true;
    audioElement.src = post.audio;
    postElement.appendChild(audioElement);
  }

  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Видалити';
  deleteButton.onclick = function() {
    var index = postsArray.indexOf(post);
    postsArray.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(postsArray));
    postElement.remove();
  };
  postElement.appendChild(deleteButton);

  document.getElementById('posts').appendChild(postElement);
}
