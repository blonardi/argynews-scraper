const PORT = 8000;

const express = require("express");
const app = express();

const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const dataUrl = [
    {
        url: "https://www.infobae.com.ar",
        clase1: ".d23-story-card-info",
        clase2: "a.headline-link",
        clase3: "aria-label",
        href: "href",
    },

    {
        url: "https://www.nytimes.com/es",
        clase1: ".d23-story-card-info",
        clase2: "a.headline-link",
        clase3: "aria-label",
        href: "href",
    },

    {
        url: "https://www.eldiaonline.com",
        clase1: ".d23-story-card-info",
        clase2: "a.headline-link",
        clase3: "aria-label",
        href: "href",
    },
];

app.use(cors());

// app.METHOD(PATH, HANDLER);

app.get("/", function (req, res) {
    res.json("This is my webscraper with node");
});

function solicitudURL(siteData, res) {
    siteData.forEach((siteObject) => {
        //         // res.send(siteObject.url);
        siteObject.url;
        //         // for (const property in siteObject) {
        //         //     console.log(property);
        //         //     if (siteObject.hasOwnProperty(property)) {
        //         //         ``;
        //         //         console.log(property);
        //         //         axios(url)
        //         //             .then((response) => {
        //         //                 const html = response.data;
        //         //                 const $ = cheerio.load(html);
        //         //                 const articles = [];
        //         //                 $(clase1, html).each(function () {
        //         //                     //esto es codigo de mi amigo chatgpt retocado por mi.
        //         //                     const headlinesElement = $(this).find(clase2);
        //         //                     headlinesElement.each((index, value) => {
        //         //                         const title = $(value).attr(clase3);
        //         //                         const urlFirst = $(value).attr(href);
        //         //                         // esta es la url completa, en el back anda ok, pero no renderiza en front => undefined
        //         //                         const urlTotal = `${url}${urlFirst}`;
        //         //                         articles.push({
        //         //                             title,
        //         //                             urlTotal,
        //         //                         });
        //         //                     });
        //         //                     // estas cosas son mias, que no funcionaban.
        //         //                     // data-mrf-link, en el a de la noticia tiene el link completo, pero me devuelve undefined, no se por que.
        //         //                     // const title = headlineElement.attr("aria-label");
        //         //                     // const url = headlineElement.attr("data-mrf-link").text();
        //         //                     // console.log(title);
        //         //                     // console.log(url);
        //         //                     // const title = headlineElement.text();
        //         //                     // console.log(title);
        //         //                     // const url = $(this).find(".headline-link").attr("href");
        //         //                 });
        //         //                 const firstArticles = articles.slice(0, 5);
        //         //                 // console.log(firstArticles);
        //         //                 res.json(firstArticles);
        //         //             })
        //         //             .catch((err) => console.log(err));
        //         //     }
        //         // }
    });
}

app.get("/results", (req, res) => {
    solicitudURL(dataUrl, res);
});

app.listen(PORT, () =>
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
);
