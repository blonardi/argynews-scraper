// const { data } = require("cheerio/lib/api/attributes");

const feedDisplay = document.querySelector("#feed");

const myUrl = "http://localhost:8000/results";

/* fetch("http://localhost:8000/results")
    .then((response) => response.json())
    .then((data) => { allArticles.push(data)
        
        data.forEach((article) => {
            console.log(article.url);
            const articleItem =
                `<div style="width:100%"><h3>` +
                article.titulo +
                `</h3><p>` +
                article.uerrele +
                `</p></div>`;
            feedDisplay.insertAdjacentHTML("beforeend", articleItem);
        });
    })
    .catch((err) => console.log(err)); */

async function getArticles () {
    const response = await fetch(myUrl)
    const allArticles = await response.json()
    return allArticles
}


async function createArticles () {
    const allArticles = await getArticles()
    const infobae = allArticles.filter(item => item[0] === 'Infobae')
    const guardian = allArticles.filter(item => item[0] === 'Guardian')
}

createArticles()