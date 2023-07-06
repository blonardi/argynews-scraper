const PORT = 8000;

const express = require("express");
const app = express();

const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const dataInfobae = {
    name: "Infobae",
    urlSite: "https://www.infobae.com",
    clase1: ".d23-story-card-ctn",
    clase2: "a.headline-link",
    clase3: ".d23-story-card-hl",
    imgClase: ".d23-story-card-info a .d23-story-card-img",
    href: "href",
    urlClase: "a.headline-link",
    imageSite: 'https://www.infobae.com/pf/resources/images/logo_infobae_naranja.svg?d=1445',
};

const dataPagina12 = {
    name: "Pagina 12",
    urlSite: "https://www.pagina12.com.ar/",
    clase1: "article",
    clase2: ".article-title",
    clase3: "h2 a",
    imgClase: ".show-for-small-only ",
    href: "href",
    urlClase: ".headline-content a",
    imageSite: 'https://www.pagina12.com.ar/assets/media/logos/amp/logo_pagina_12_n.svg?v=2.0.143',
};

const dataClarin = {
    name: "Clarin",
    urlSite: "https://www.clarin.com/",
    clase1: ".content-nota",
    clase2: ".mt",
    clase3: "h2",
    imgClase: "picture img",
    urlClase: ".link_article",
    href: "href",
    imageSite: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Clar%C3%ADn_logo.svg',
};

const dataAmbito = {
    name: "Ambito Financiero",
    urlSite: "https://www.ambito.com/",
    clase1: ".news-article",
    clase2: ".news-article__info-wrapper",
    clase3: ".news-article__title > a",
    imgClase: "a > .figure-img",
    urlClase: ".news-article__title a",
    href: "href",
    imageSite: 'https://www.ambito.com/css-custom/239/v3/images/main-logo.svg',
};

const dataPerfil = {
    name: "Perfil",
    urlSite: "https://www.perfil.com/",
    clase1: ".news",
    clase2: ".news__data",
    clase3: ".news__title",
    imgClase: ".news__media .img-fluid",
    urlClase: "a",
    href: "href",
    imageSite: 'https://www.perfil.com/img/logo-perfil-header.png',
};
app.use(cors());

// app.METHOD(PATH, HANDLER);

app.get("/", function (req, res) {
    res.json("This is my webscraper with node");
});

function sanitizerText(texto) {
    // asercion, va a empezar o finalizar con x cosa
    const sanitiziedText = texto.replace(/\t+/g, " ").trim();
    return sanitiziedText;
}
const container = [];

async function solicitudURL(siteData, res) {
    const { name, imageSite, clase1, clase2, clase3, imgClase, href, urlClase, urlSite } =
        siteData;
    try {
        await axios(urlSite).then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const articles = [];

            $(clase1, html).each(function () {
                const image = $(this).find(imgClase).attr("src");
                const divCard = $(this).find(clase2);
                const titleReceived =
                    divCard.find(clase3).text() || $(this).find(clase3).text();
                const title = sanitizerText(titleReceived);
                const url = $(this).find(urlClase).attr(href);
                divCard.attr(href) ||
                    $(this).attr(href) ||
                    $(this).find(clase3).attr(href);
                
                articles.push({
                    title,
                    url,
                    image,
                });
            });
            const firstArticles = articles.slice(0, 8);
            const newPage = { name, imageSite, urlSite ,firstArticles };

            const isInContainer = container.some(page => page.name === name)
            if(isInContainer) { return }

            container.push(newPage);
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
    await solicitudURL(dataPagina12, res)
    await solicitudURL(dataClarin, res)
    await solicitudURL(dataAmbito, res);
    await solicitudURL(dataPerfil, res);
    res.json(container);
});

app.listen(PORT, () =>
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
);
