/** Exercise 03 - Form **/

// Add your code here
function log() {
  var UserName = document.getElementById("inputname");
  var UserEmail = document.getElementById("inputemail");
  var UserMessage = document.getElementById("inputmessage");
  var UserNews = document.getElementById("check");
  if (UserName.value) {
    console.log("======== Form Submission ========");
    console.log("Name:" + UserName.value);
    console.log("Email:" + UserEmail.value);
    if (UserMessage.value) {
      console.log("Feedback: " + UserMessage.value);
    } else console.log("Feedback: No Feedback weas submitted.");
    if (document.getElementById("check").checked) {
      console.log("Newsletter: Yes, I would like to join the newsletter.");
    } else console.log("Newsletter: No, thank you.");
  }
}
