"use strict";

const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");

const currentUser = JSON.parse(getFromStorage("CURRENT_USER"));
console.log(currentUser);

const todoArr = JSON.parse(getFromStorage("TODO_ARR"))
  ? JSON.parse(getFromStorage("TODO_ARR"))
  : [];

console.log(todoArr);

const userList = todoArr.filter((acc) => acc.owner === currentUser.username);
console.log(userList);

const checked = (isDone) => (isDone ? "checked" : "");
const renderList = () => {
  userList.forEach((el, i) => {
    todoList.insertAdjacentHTML(
      "afterbegin",
      `<li class = "task${i} ${checked(el.isDone)}" onclick = "toggleTask('${
        el.task
      }')">
    ${el.task}
    <span class="close" onclick = "deletedTask('${i}', '${el.owner}', '${
        el.task
      }', event)">×</span>
  </li>`
    );
  });
};
// Hien thi danh sach task
renderList();

// Them Task
btnAdd.addEventListener("click", function () {
  // Validate task
  if (inputTask.value == "") {
    alert("Please input task");
    inputTask.focus();
  } else {
    const check = userList.find((user) => user.task === inputTask.value);
    if (check) {
      alert("Task has been added");
      inputTask.focus();
    } else {
      const task = new Task(
        `${inputTask.value}`,
        `${currentUser.username}`,
        false
      );
      todoArr.push(task);
      userList.push(task);
      saveToStorage("TODO_ARR", JSON.stringify(todoArr));
      todoList.innerHTML = "";
      renderList();
      inputTask.value = "";
    }
  }
});

// Ham check task
const findUserlist = (task) => {
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].task === task) return i;
  }
  return -1;
};

const toggleTask = (task) => {
  const x = findUserlist(task);
  if (x > -1) {
    if (!userList[x].isDone) {
      document.querySelector(`.task${x}`).classList.add("checked");
      userList[x].isDone = !userList[x].isDone;
      saveToStorage("TODO_ARR", JSON.stringify(todoArr));
    } else {
      document.querySelector(`.task${x}`).classList.remove("checked");
      userList[x].isDone = !userList[x].isDone;
      saveToStorage("TODO_ARR", JSON.stringify(todoArr));
    }
  }
};

// Ham deleted Task
const deletedTask = (i, owner, task, e) => {
  if (confirm("Are you sure DELETE THIS TASK???")) {
    userList.splice(i, 1);
    const index = todoArr.findIndex(
      (el) => el.owner === owner && el.task === task
    );
    console.log(index);
    todoArr.splice(index, 1);
    saveToStorage("TODO_ARR", JSON.stringify(todoArr));
    todoList.innerHTML = "";
    renderList(userList);
  } else {
    e.stopPropagation();
  }
};
