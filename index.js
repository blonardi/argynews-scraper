const PORT = 8000;

const express = require("express");
const app = express();

const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

/*  const dataUrl = [
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
         noticias : [noticia1, noticia2]
     },
 ]; */

const dataInfobae = {
    name: "Infobae",
    url: "https://www.infobae.com",
    // clase1: ".d23-story-card-info",
    clase1: "a.headline-link",
    clase3: ".d23-story-card-hl",
    href: "href",
};

const dataCNN = {
    name: "CNN",
    url: "https://cnnespanol.cnn.com/",
    clase1: ".news__data",
    clase2: ".news__title",
    clase3: ".news__title > a",
    href: "href",
};

const dataAmbito = {
    name: "Ambito Financiero",
    url: "https://www.ambito.com/",
    clase1: ".news-article__info-wrapper",
    clase2: ".news-article__title",
    clase3: ".news-article__title > a",
    href: "href",
};

const dataGuardian = {
    name: "Guardian",
    url: "https://www.theguardian.com/uk",
    clase1: ".fc-item__title",
    clase2: ".fc-item__link",
    clase3: ".js-headline-text",
    href: "href",
};

app.use(cors());

// app.METHOD(PATH, HANDLER);

app.get("/", function (req, res) {
    res.json("This is my webscraper with node");
});

// async function solicitudURL(siteData, res) {
//     // siteData.forEach((siteObject) => {
//     const { url, clase1, clase2, clase3, href } = siteData;
//     try {
//         await axios(url).then((response) => {
//             const html = response.data;
//             const $ = cheerio.load(html);
//             const articles = [];
//             $(clase1, html).each(function () {
//                 // const titulo = $(this).text();
//                 // const uerrele = $(this).find("a").attr(href);
//                 const headlinesElement = $(this).find(clase2);
//                 headlinesElement.each((index, value) => {
//                     const title = $(value).attr(clase3);
//                     const urlFirst = $(value).attr(href);
//                     const urlTotal = `${url}${urlFirst}`;
//                     // esta es la url completa, en el back anda ok, pero no renderiza en front => undefined
//                     articles.push({
//                         title,
//                         urlTotal,
//                         // titulo,
//                         // uerrele,
//                     });
//                 });
//             });
//             const firstArticles = articles.slice(0, 5);
//             res.json(firstArticles);
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error: "Ocurrió un error en la solicitud.",
//         });
//     }
// }
function sanitizerText(texto) {
    // asercion, va a empezar o finalizar con x cosa
    const sanitiziedText = texto.replace(/\t+/g, " ").trim();
    return sanitiziedText;
}
const container = [];
async function solicitudURL(siteData, res) {
    // siteData.forEach((siteObject) => {
    const { name, url, clase1, clase2, clase3, href } = siteData;
    try {
        await axios(url).then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const articles = [];
            $(clase1, html).each(function () {
                const item = $(this).find(clase2);
                const title =
                    item.find(clase3).text() || $(this).find(clase3).text();
                const url =
                    item.attr(href) ||
                    $(this).attr(href) ||
                    $(this).find(clase3).attr(href);
                const sanitiziedText = sanitizerText(title);
                // esta es la url completa, en el back anda ok, pero no renderiza en front => undefined
                articles.push({
                    sanitiziedText,
                    url,
                });
            });
            const firstArticles = articles.slice(0, 5);
            const newPage = { name, firstArticles };
            container.push(newPage);
            // return firstArticles
            // return { site: name, articles };
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Ocurrió un error en la solicitud.",
        });
    }
}

app.get("/results", async (req, res) => {
    await solicitudURL(dataInfobae, res);
    await solicitudURL(dataGuardian, res);
    await solicitudURL(dataCNN, res);
    await solicitudURL(dataAmbito, res);
    res.json(container);
});

app.listen(PORT, () =>
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
);
