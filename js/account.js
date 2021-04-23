import * as Be from './be.js';

const regForm = document.querySelector("#registration--form");
const regEmail = document.querySelector(".reg-email");
const regUsername = document.querySelector(".reg-username");
const regPassword = document.querySelector(".reg-password");
const logForm = document.querySelector("#login--form");
const logUsername = document.querySelector(".log-username");
const logPassword = document.querySelector(".reg-password");

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // login so it can create a user
  // the user can do only one thing, create accounts
  Be.login(Be.RE_USERNAME, Be.RE_PASSWORD)
    .then(res => {
      if (res.message != 200)
        throw new Error(res)
  
      //return 200 if login successful
      const token = window.sessionStorage.getItem(Be.USER_TOKEN)
      Be.register(token, regUsername.value, regEmail.value, regPassword.value)
      .then(res => {
        console.log(res)
      })
  
    })
    .catch(err => {
      console.log("no login")
    })


})
