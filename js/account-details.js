import * as Be from "./be.js";
import * as Utils from "./utils.js";

const logout = document.querySelector("#logout");
const personalForm = document.querySelector("#personal--form");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const nickname = document.querySelector("#nickname");
const extraInfo = document.querySelector("#extra-info");
const email = document.querySelector("#email");
const url = document.querySelector("#url");
const feedbackPersonal = document.querySelector("#feedback-personal");
const passwordForm = document.querySelector("#password--form");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const feedbackPassword = document.querySelector("#feedback-password");

const token = sessionStorage.getItem(Be.USER_TOKEN);
const id = sessionStorage.getItem(Be.USER_ID);
// redirect if not a user is logged in
if (!token) {
  window.location.href = "index.html";
}
Be.checkIfLoggedIn(document.querySelector(".account-image"));

// log out
logout.addEventListener("click", e => {
  e.preventDefault();
  Be.logout();
  window.location.href = "index.html";
});

// fill the personal information form
Be.getUserDetails(token, id).then(res => {
  if (res.ok) {
    // fill the form fields
    firstName.value = res.data["first_name"];
    lastName.value = res.data["last_name"];
    nickname.value = res.data.nickname;
    email.value = res.data.email;
    extraInfo.innerHTML = res.data.description;
    url.value = res.data.url;
  } else {
    // something bad
  }
});

url.addEventListener("input", e => {
  if (!Utils.regexUrl.test(url.value)){
    Utils.showError(url, "It is not a valid url address")
    personalForm.querySelector("button").disabled = true;
  } else {
    Utils.hideError(url);
    personalForm.querySelector("button").disabled = false;
  }
})

//update the personal information
personalForm.addEventListener("submit", e => {
  e.preventDefault();

  const user = {};
  user.firstName = firstName.value;
  user.lastName = lastName.value;
  user.nickname = nickname.value;
  user.extraInfo = extraInfo.value;
  user.email = email.value;
  user.url = url.value;
  user.id = id;

  Be.updateUser(token, user).then(res => {
    if (res.ok) {
      Utils.posFeedback(feedbackPersonal, "Your profile has been updated");
    }
  });
});

// password change
password.addEventListener("blur", e => {
  if (password.value.length < 6) {
    Utils.showError(password, "Minimum 6 characters");
  } else {
    Utils.hideError(password);
  }
  checkPasswords();
});

password2.addEventListener("input", e => {
  if (password2.value != password.value) {
    Utils.showError(password2, "The passwords are not the same");
  } else {
    if (password.value != "") {
      Utils.hideError(password2);
    } else {
      Utils.showError(password2, "Passwords do not the match");
    }
  }
  checkPasswords();
});

function checkPasswords() {
  if (password.value == password2.value && password.value.length > 5)
    document.querySelector("#pass button").disabled = false;
  else document.querySelector("#pass button").disabled = true;
}

passwordForm.addEventListener("submit", e => {
  e.preventDefault();

  Be.updatePassword(token, id, password.value).then(res => {
    if (res.ok) {
      Utils.posFeedback(feedbackPassword, "Your password has been changed");
    } else {
      console.log(res.data)
    }
  });
});