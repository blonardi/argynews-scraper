// const { data } = require("cheerio/lib/api/attributes");

const feedDisplay = document.querySelector("#feed");

const myUrl = "http://localhost:8000/results";

fetch("http://localhost:8000/results")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((article) => {
            console.log(article.url);
            const articleItem =
                `<div style="width:100%"><h3>` +
                article.title +
                `</h3><p>` +
                article.url +
                `</p></div>`;
            feedDisplay.insertAdjacentHTML("beforeend", articleItem);
        });
    })
    .catch((err) => console.log(err));
