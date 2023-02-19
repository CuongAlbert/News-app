"use strict";

const newsContainer = document.getElementById("news-container");
const pageNumber = document.getElementById("page-num");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const apiKey = "d2c24b1fd0824a3d974001982ddb6fbd";

const dataSetting = JSON.parse(getFromStorage("DATA_SETTING"));

console.log(dataSetting);

const newsApi = async function (country, category, page, pageSize, apiKey) {
  try {
    const news = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pagesize=${pageSize}&apiKey=${apiKey}`
    );

    if (!news.ok) throw new Error("Problem getting news data");
    const dataNews = await news.json();
    console.log(dataNews);

    const newsArticles = dataNews.articles;
    console.log(newsArticles);

    const totalResults = dataNews.totalResults;

    const totalPages =
      totalResults % pageSize === 0
        ? totalResults / pageSize
        : Math.floor(totalResults / pageSize + 1);
    console.log(totalPages);

    pageNumber.innerHTML = `${page}`;

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
                class="btn btn-primary" target="_blank"
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

let page = 1;
let pageSize = 20;
let category = "business";
if (dataSetting) {
  pageSize = Number(dataSetting.pageSize);
  category = dataSetting.category;
  newsApi("us", category, page, pageSize, apiKey);
} else {
  newsApi("us", category, page, pageSize, apiKey);
}

btnNext.addEventListener("click", function (e) {
  newsContainer.innerHTML = "";
  page += 1;
  newsApi("us", category, page, pageSize, apiKey);
  console.log(page);
});
btnPrev.addEventListener("click", function (e) {
  newsContainer.innerHTML = "";
  page -= 1;
  newsApi("us", category, page, pageSize, apiKey);
});
