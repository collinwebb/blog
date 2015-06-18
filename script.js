var Blog = {
  db: new Firebase("https://collinwebb.firebaseio.com"),
  init: function() {
    Blog.login();
    Blog.db.onAuth(function(authData) {
      if (authData) {
        Blog.currentUser = authData.google;
        Blog.render();
        console.log("Authenticated with uid:", authData.uid);
      } else {
        console.log("Client unauthenticated.");
      }
    });
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
    blog.find("form").submit(function(){
      var post = blog.find("textarea").val();
      Blog.postsRef.push({
        authorName: Blog.currentUser.displayName,
        text: post,
        postTime: Firebase.ServerValue.TIMESTAMP
      });
      return false;
    });
    var templatePost = $("#posts .post:last"), currentPost, post, posts = [];
    Blog.postsRef.on("value", function(snap){
      var blogPosts = snap.val();
      for (var key in blogPosts){
        post = blogPosts[key];
        var postTime = new Date(post.postTime).toLocaleString();
        currentPost = templatePost.clone().show();

        currentPost.find(".author-name").text(post.authorName);
        currentPost.find(".timestamp").text(postTime);
        currentPost.find(".text").text(post.text);

        posts.unshift(currentPost);
      }
      $("#posts").prepend(posts);
    });
  },
};

Blog.postsRef = Blog.db.child("posts");

$(document).ready(Blog.init);
