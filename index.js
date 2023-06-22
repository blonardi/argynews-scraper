const PORT = 8000;

const express = require("express");
const app = express();

const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

// const dataUrl = [
//     {
//         url: "https://www.infobae.com.ar",
//         clase1: ".d23-story-card-info",
//         clase2: "a.headline-link",
//         clase3: "aria-label",
//         href: "href",
//     },

//     {
//         url: "https://www.nytimes.com/es",
//         clase1: ".d23-story-card-info",
//         clase2: "a.headline-link",
//         clase3: "aria-label",
//         href: "href",
//     },

//     {
//         url: "https://www.eldiaonline.com",
//         clase1: ".d23-story-card-info",
//         clase2: "a.headline-link",
//         clase3: "aria-label",
//         href: "href",
//     },
// ];

const dataUrl = {
    url: "https://www.infobae.com",
    clase1: ".d23-story-card-info",
    clase2: "a.headline-link",
    clase3: "aria-label",
    href: "href",
};

app.use(cors());

// app.METHOD(PATH, HANDLER);

app.get("/", function (req, res) {
    res.json("This is my webscraper with node");
});

async function solicitudURL(siteData, res) {
    // siteData.forEach((siteObject) => {
    const { url, clase1, clase2, clase3, href } = siteData;
    try {
        await axios(url).then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const articles = [];
            $(clase1, html).each(function () {
                // const titulo = $(this).text();
                // const uerrele = $(this).find("a").attr(href);
                //esto es codigo de mi amigo chatgpt retocado por mi.
                const headlinesElement = $(this).find(clase2);
                headlinesElement.each((index, value) => {
                    const title = $(value).attr(clase3);
                    const urlFirst = $(value).attr(href);
                    const urlTotal = `${url}${urlFirst}`;
                    // esta es la url completa, en el back anda ok, pero no renderiza en front => undefined
                    articles.push({
                        title,
                        urlTotal,
                        // titulo,
                        // uerrele,
                    });
                });
            });
            const firstArticles = articles.slice(0, 5);
            // console.log(firstArticles);
            res.json(firstArticles);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Ocurrió un error en la solicitud.",
        });
    }
    // });
}

app.get("/results", (req, res) => {
    solicitudURL(dataUrl, res);
});

app.listen(PORT, () =>
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
);
