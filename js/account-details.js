import * as Be from "./be.js";
import { posFeedback } from "./utils.js";

const logout = document.querySelector("#logout");
const personalForm = document.querySelector("#personal--form");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const nickname = document.querySelector("#nickname");
const extraInfo = document.querySelector("#extra-info");
const email = document.querySelector("#email");
const url = document.querySelector("#url");
const feedbackPersonal = document.querySelector("#feedback-personal");

const token = sessionStorage.getItem(Be.USER_TOKEN);
const id = sessionStorage.getItem(Be.USER_ID);
// redirect if not a user is logged in
if (!token) {
  window.location.href = "index.html";
}

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
      posFeedback(feedbackPersonal, "Your profile has been updated");
    }
  });
});
