"use strict";

const User = function (firstName, lastName, username, password) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.username = username;
  this.password = password;
};

function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );

  return user;
}

const Task = function (task, owner, isDone) {
  this.task = task;
  this.owner = owner;
  this.isDone = isDone;
};
