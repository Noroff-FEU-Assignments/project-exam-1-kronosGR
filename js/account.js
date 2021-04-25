import * as Be from "./be.js";
import * as Utils from "./utils.js";

const regForm = document.querySelector("#registration--form");
const regEmail = document.querySelector("#reg-email");
const regUsername = document.querySelector("#reg-username");
const regPassword = document.querySelector("#reg-password");
const regPassword2 = document.querySelector("#reg-password2");
const regError = document.querySelector("#reg-error");
const logForm = document.querySelector("#login--form");
const logUsername = document.querySelector("#log-username");
const logPassword = document.querySelector("#reg-password");
const logError = document.querySelector("#log-error");
const page2 = document.querySelector("#page2");

regUsername.addEventListener("blur", (e) => {
  if (regUsername.value.length < 3) {
    Utils.showError(regUsername, "Minimum 5 characters");
  } else {
    Utils.hideError(regUsername);
  }
});

regEmail.addEventListener("blur", (e) => {
  console.log("aa");
});

regPassword.addEventListener("blur", (e) => {
  if (regPassword.value.length < 6){
    Utils.showError(regPassword, "Minimum 6 characters");
  } else {
    Utils.hideError(regPassword);
  }
});

regPassword2.addEventListener("blur", (e) => {
  if (regPassword2.value != regPassword.value){
    Utils.showError(regPassword2, "The passwords are not the same");
  } else {
    Utils.hideError(regPassword2);
  }
});

regForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // login so it can create a user
  // the user can do only one thing, create accounts
  Be.login(Be.RE_USERNAME, Be.RE_PASSWORD)
    .then((res) => {
      if (res.ok) {
        //return 200 if login successful
        const token = window.sessionStorage.getItem(Be.USER_TOKEN);
        Be.register(
          token,
          regUsername.value,
          regEmail.value,
          regPassword.value
        ).then((res) => {
          if (res.ok) {
            // login to user already created and redirect to
            console.log(res);
          } else {
            // appear the message to the screen
            console.log(res.data.message);
          }
        });
      } else {
        console.log(res.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
