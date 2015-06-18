var ref = new Firebase("https://collinwebb.firebaseio.com");
ref.authWithOAuthRedirect("google", function(error) {
  if (error) {
    console.log("Login Failed!", error);
  } 
});
