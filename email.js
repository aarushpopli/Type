document.getElementById("nameid").innerHTML = "Hi, " + localStorage.getItem("name")

function sendEmail() {
  if (
    localStorage.getItem("WPM") != null &&
    localStorage.getItem("highscore") == null
  ) {
    var body =
      "Hi, " +
      localStorage.getItem("name") +
      ". Your typing speed is " +
      localStorage.getItem("WPM") +
      " WPM which equals " +
      localStorage.getItem("CPM") +
      " CPM. You've made " +
      localStorage.getItem("EI") +
      " mistakes and have " +
      localStorage.getItem("AI") +
      "% total accuracy.";
    document.getElementById("emailid").innerHTML = "Email Sent";
    Email.send({
      Host: "smtp.gmail.com",
      Username: "type.noreply@gmail.com",
      Password: "TYPE11aarush",
      To: localStorage.getItem("email"),
      From: "type.noreply@gmail.com",
      Subject: "Typing Scores",
      Body: body,
    }).then(
      setTimeout(function () {
        document.getElementById("emailid").innerHTML = "Email Scores";
      }, 1000)
    );
  } else if (
    localStorage.getItem("WPM") == null &&
    localStorage.getItem("highscore") != null
  ) {
    var body =
      "Hi, " +
      localStorage.getItem("name") +
      ". Your high score in Type it out is " +
      localStorage.getItem("highscore") +
      ".";
    document.getElementById("emailid").innerHTML = "Email Sent";
    Email.send({
      Host: "smtp.gmail.com",
      Username: "type.noreply@gmail.com",
      Password: "TYPE11aarush",
      To: localStorage.getItem("email"),
      From: "type.noreply@gmail.com",
      Subject: "Typing Scores",
      Body: body,
    }).then(
      setTimeout(function () {
        document.getElementById("emailid").innerHTML = "Email Scores";
      }, 1000)
    );
  } else if (
    localStorage.getItem("WPM") != null &&
    localStorage.getItem("highscore") != null
  ) {
    var body =
      "Hi, " +
      localStorage.getItem("name") +
      ". Your typing speed is " +
      localStorage.getItem("WPM") +
      " WPM which equals " +
      localStorage.getItem("CPM") +
      " CPM. You've made " +
      localStorage.getItem("EI") +
      " mistakes and have " +
      localStorage.getItem("AI") +
      "% total accuracy." +
      "\nYour high score in Type it out is " +
      localStorage.getItem("highscore") +
      ".";
    document.getElementById("emailid").innerHTML = "Email Sent";
    Email.send({
      Host: "smtp.gmail.com",
      Username: "type.noreply@gmail.com",
      Password: "TYPE11aarush",
      To: localStorage.getItem("email"),
      From: "type.noreply@gmail.com",
      Subject: "Typing Scores",
      Body: body,
    }).then(
      setTimeout(function () {
        document.getElementById("emailid").innerHTML = "Email Scores";
      }, 1000)
    );
  } else {
    document.getElementById("emailid").innerHTML = "Test not attempted";
    setTimeout(function () {
      document.getElementById("emailid").innerHTML = "Email Scores";
    }, 1000);
  }
}
