"use strict";

const inputQuery = document.getElementById("input-query");
const newsContainer = document.getElementById("news-container");

const btnSearch = document.getElementById("btn-submit");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

const apiKey = "d2c24b1fd0824a3d974001982ddb6fbd";
const dataSetting = JSON.parse(getFromStorage("DATA_SETTING"))
  ? JSON.parse(getFromStorage("DATA_SETTING"))
  : { pageSize: 20, category: "business" };

let language = "en";
let page = 1;
let pageSize = Number(dataSetting.pageSize);

const newsSearch = async function (language, q, page, pageSize, apiKey) {
  try {
    const news = await fetch(
      `https://newsapi.org/v2/everything?language=${language}&q=${q}&page=${page}&pagesize=${pageSize}&apiKey=${apiKey}`
    );
    if (!news.ok) throw new Error("Problem getting news data");
    const dataNews = await news.json();
    console.log(dataNews);

    const newsArticles = dataNews.articles;
    console.log(newsArticles);

    const totalResults = dataNews.totalResults;
    console.log(totalResults);
    console.log(pageSize);

    const totalPages =
      totalResults % pageSize === 0
        ? totalResults / pageSize
        : Math.floor(totalResults / pageSize + 1);
    console.log(totalPages);

    document.getElementById("page-num").innerHTML = `${page}`;

    if (page === 1) {
      btnPrev.style.display = "none";
      btnNext.style.display = "block";
    } else if (page === totalPages) {
      btnPrev.style.display = "block";
      btnNext.style.display = "none";
    } else if (page > 1 && page < totalPages) {
      btnPrev.style.display = "block";
      btnNext.style.display = "block";
    }

    for (let i = 0; i < pageSize; i++) {
      const html = `
        <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              src=${newsArticles[i].urlToImage}
              class="card-img"
              alt=${newsArticles[i].title}
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                ${newsArticles[i].title}
              </h5>
              <p class="card-text">
                ${newsArticles[i].content}
              </p>
              <a
                href="${newsArticles[i].url}"
                class="btn btn-primary"
                >View</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
      newsContainer.insertAdjacentHTML("afterbegin", html);
    }
  } catch (err) {
    console.error(err);
  }
};

btnSearch.addEventListener("click", function () {
  if (inputQuery.value == "") {
    alert("Vui long nhap du lieu");
    inputQuery.focus();
  } else {
    page = 1;
    newsContainer.innerHTML = "";
    newsSearch(language, inputQuery.value, page, pageSize, apiKey);
  }
});

btnNext.addEventListener("click", function () {
  newsContainer.innerHTML = "";
  page += 1;
  newsSearch(language, inputQuery.value, page, pageSize, apiKey);
});
btnPrev.addEventListener("click", function () {
  newsContainer.innerHTML = "";
  page -= 1;
  newsSearch(language, inputQuery.value, page, pageSize, apiKey);
});
