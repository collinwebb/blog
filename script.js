var Blog = {
  db: new Firebase("https://collinwebb.firebaseio.com"),
  init: function() {
    Blog.login();
    // BMloader(); //make on click and fixed top.
  },

  login: function() {
    $("#login").on("click", function(){
      Blog.db.authWithOAuthRedirect("google", function(error) {
        if (error) {
          console.log("Login Failed!", error);
        }
      });
    });
  },
  render: function() {
    var blog = $("#blog");
    blot.find("form").submit(function(){
      var post = blog.find("textarea").val();
      Blog.postsRef.push({
        authorName: Blog.currentUser.displayName,
        text: postText,
        postTime: Firebase.ServerValue.TIMESTAMP
      });
      return false;
    });
    var templatePost = $("#posts .post:last"), currentPost;
    Blog.postsRef.on("child_added", function(snap){
      var blogPost = snap.val();
      var postTime = new Date(blogPost.postTime).toLocaleString();
      currentPost = templatePost.clone().show();
      currentPost.find(".author-name").text(blogPost.authorName);
      currentPost.find(".timestamp").text(postTime);
      currentPost.find(".text").text(blogPost.text);
      $("#posts").prepend(currentPost);
    });
  },
};

Blog.postsRef = Blog.db.child("posts");

$(document).ready(Blog.init);
