"use strict";

const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");

const btnLogin = document.getElementById("btn-submit");

const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY))
  ? JSON.parse(getFromStorage(KEY))
  : [];

let currentUser;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputUsername.value == "") {
    alert("Please input your username!");
    inputUsername.focus();
  } else {
    currentUser = userArr.find((user) => user.username === inputUsername.value);
    console.log(currentUser);

    if (!currentUser) {
      alert("Usename has not been validated");
      inputUsername.focus();
    } else if (currentUser.password !== inputPassword.value) {
      alert("Uncorrect password");
      inputPassword.focus();
    } else {
      saveToStorage("CURRENT_USER", JSON.stringify(currentUser));
      saveToStorage("IS_LOGIN", 1);
      window.location.href = "../index.html";
    }
  }
});
