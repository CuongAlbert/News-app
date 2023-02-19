"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const mainMess = document.getElementById("welcome-message");
const btnLogOut = document.getElementById("btn-logout");

const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY));
const isLogin = getFromStorage("IS_LOGIN");
const currentUser = JSON.parse(getFromStorage("CURRENT_USER"))
  ? JSON.parse(getFromStorage("CURRENT_USER"))
  : [];

if (isLogin === "1") {
  loginModal.style.display = "none";
  mainMess.innerHTML = `Welcome ${currentUser.firstName}`;
} else {
  loginModal.style.display = "block";
  mainMess.style.display = "none";
  btnLogOut.style.display = "none";
}

btnLogOut.addEventListener("click", function () {
  if (isLogin === "1") {
    saveToStorage("IS_LOGIN", 0);
    localStorage.removeItem("CURRENT_USER");
    window.location.href = "pages/login.html";
  }
});
