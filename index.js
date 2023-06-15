const PORT = 8000;

const express = require("express");
const app = express();

const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const urlOle = "https://www.ole.com.ar";
const claseOle = "";
const urlNyt = "https://www.nytimes.com/es";
const claseNyt = "";
const urlDia = "https://www.eldiaonline.com";
const claseDia = "";

app.use(cors());

// app.METHOD(PATH, HANDLER);

app.get("/", function (req, res) {
    res.json("This is my webscraper with node");
});

function solicitudURL(url, clase, res) {
    axios(url)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const articles = [];

            $(clase, html).each(function () {
                //esto es codigo de mi amigo chatgpt retocado por mi.

                const headlinesElement = $(this).find("a.headline-link");
                headlinesElement.each((index, value) => {
                    const title = $(value).attr("aria-label");
                    const urlFirst = $(value).attr("href");
                    // esta es la url completa, en el back anda ok, pero no renderiza en front => undefined
                    const urlTotal = `${url}${urlFirst}`;
                    articles.push({
                        title,
                        urlTotal,
                    });
                    // console.log(
                    //     $(value).attr("aria-label"),
                    //     " => ",
                    //     $(value).attr("href")
                    // );
                });

                // estas cosas son mias, que no funcionaban.
                // data-mrf-link, en el a de la noticia tiene el link completo, pero me devuelve undefined, no se por que.

                // const title = headlineElement.attr("aria-label");
                // const url = headlineElement.attr("data-mrf-link").text();
                // console.log(title);
                // console.log(url);
                // const title = headlineElement.text();
                // console.log(title);
                // const url = $(this).find(".headline-link").attr("href");
            });
            const firstArticles = articles.slice(0, 5);
            // console.log(firstArticles);
            res.json(firstArticles);
        })
        .catch((err) => console.log(err));
}

app.get("/results", (req, res) => {
    const urlInfobae = "https://www.infobae.com";
    const claseInfobae = ".d23-story-card-info";
    solicitudURL(urlInfobae, claseInfobae, res);
});

app.listen(PORT, () =>
    console.log(`Servidor escuchando en el puerto : ${PORT}`)
);
