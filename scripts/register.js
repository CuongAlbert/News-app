"use strict";
const inputFirtName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnRegister = document.getElementById("btn-submit");

const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY))
  ? JSON.parse(getFromStorage(KEY))
  : [];

// let userArr = [];

// Validate Data
const validate = function () {
  let checkUser;
  checkUser = userArr.find((user) => user.username === inputUsername.value);
  if (inputFirtName.value == "") {
    alert("Please input your first name");
    inputFirtName.focus();
  } else if (inputLastName.value == "") {
    alert("Please input your last name");
    inputLastName.focus();
  } else if (inputUsername.value == "") {
    alert("Please input username");
    inputUsername.focus();
  } else if (checkUser) {
    alert("Username has been unique");
    inputUsername.focus();
  } else if (inputPassword.value.length < 8) {
    alert("Password at least 8 characters!");
    inputPassword.focus();
  } else if (inputPasswordConfirm.value !== inputPassword.value) {
    alert("Confirm password uncorrect!");
    inputPasswordConfirm.focus();
  } else {
    return true;
  }
};
btnRegister.addEventListener("click", function () {
  if (validate()) {
    let newUser = new User(
      inputFirtName.value,
      inputLastName.value,
      inputUsername.value,
      inputPassword.value
    );

    userArr.push(newUser);

    saveToStorage("USER_ARRAY", JSON.stringify(userArr));
    window.location.href = "login.html";
  }
  console.log(userArr);
});
