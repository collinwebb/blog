var ref = new Firebase("https://collinwebb.firebaseio.com");

$("#login").on("click", function(){
  ref.authWithOAuthRedirect("google", function(error) {
    if (error) {
      console.log("Login Failed!", error);
    }
  });
});
