"use strict";

const inputPagesize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const saveSetting = document.getElementById("btn-submit");
const dataSetting = JSON.parse(getFromStorage("DATA_SETTING"))
  ? JSON.parse(getFromStorage("DATA_SETTING"))
  : {};

if (!dataSetting) {
  inputPagesize.value = "";
  inputCategory.value = "";
} else {
  inputPagesize.value = dataSetting.pageSize;
  inputCategory.value = dataSetting.category;
}
saveSetting.addEventListener("click", function () {
  let dataSetting = {};
  if (inputPagesize.value === "" || inputPagesize.value === String(0)) {
    alert("News per page khong duoc de trong hoac lon hon 0");
    inputPagesize.focus();
  } else {
    dataSetting = {
      pageSize: inputPagesize.value,
      category: inputCategory.value,
    };
    saveToStorage("DATA_SETTING", JSON.stringify(dataSetting));
  }
});
