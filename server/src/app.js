// const PORT = process.env.PORT || 8000;

// import express from "express";
// import cors from "cors";

// const app = express();
// const cors = require("cors");
// app.use(cors());

import puppeteer, { PuppeteerNode } from "puppeteer";

const dataInfobae = {
    name: "Infobae",
    urlSite: "https://www.infobae.com",
    cardClass: ".d23-story-card-ctn",
    titleClass: ".headline-link h2",
    imageClass: ".d23-story-card-info a .d23-story-card-img",
    imageSite:
        "https://www.infobae.com/pf/resources/images/logo_infobae_naranja.svg?d=1445",
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
    imageSite:
        "https://www.pagina12.com.ar/assets/media/logos/amp/logo_pagina_12_n.svg?v=2.0.143",
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
    imageSite:
        "https://upload.wikimedia.org/wikipedia/commons/7/73/Clar%C3%ADn_logo.svg",
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
    imageSite: "https://www.ambito.com/css-custom/239/v3/images/main-logo.svg",
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
    imageSite: "https://www.perfil.com/img/logo-perfil-header.png",
};

const container = [];
async function solicitudURL(siteData) {
    const { name, imageSite, urlSite, cardClass, titleClass, imageClass } =
        siteData;

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200,
    });
    const page = await browser.newPage();

    await page.goto(urlSite);
    // await page.waitForNavigation({ waitUntil: "domcontentloaded" });

    // Función que se ejecutará en el contexto de la página
    const scrollDown = async () => {
        // Desplázate hacia abajo hasta el final de la página
        await new Promise((resolve) => {
            const distance = 100; // Distancia de desplazamiento
            const delay = 100; // Retardo entre desplazamientos
            const timer = setInterval(() => {
                window.scrollBy(0, distance);
                if (
                    window.innerHeight + window.pageYOffset >=
                    document.body.scrollHeight
                ) {
                    clearInterval(timer);
                    resolve();
                }
            }, delay);
        });
    };

    // Ejecuta la función de desplazamiento en la página
    await page.evaluate(scrollDown);
    const defaultImageUrl =
        "https://www.alcaldianeiva.gov.co/NuestraAlcaldia/SalaDePrensa/PublishingImages/$$PRUEBA%20NOTICIA.png";

    const articles = [];
    const limit = 8;
    const cards = await page.$$(cardClass);
    for (const card of cards) {
        try {
            // Espero elementos, titulos e imagen
            const titleElement = await card.$(titleClass);
            const imgElement = await card.$(imageClass);

            const titulo = await titleElement.evaluate(
                (el) => (el ? el.textContent : null),
                titleElement
            );
            let imgSrc;
            try {
                imgSrc = await imgElement.evaluate(
                    (el) => el.getAttribute("src"),
                    imgElement
                );
            } catch (error) {
                console.error("Error al obtener imagenSelector:", error);
                imgSrc = defaultImageUrl;
            }

            const isFull = articles.length === limit;
            if (isFull) {
                return;
            }

            articles.push({
                titulo,
                imgSrc,
            });

            // const isInContainer = container.some((page) => page.name === name);
            // if (isInContainer) {
            //     return;
            // }

            console.log("Título:", titulo);
            console.log("Imagen:", imgSrc);
        } catch (error) {
            console.error("Error en el bucle:", error);
            // res.status(500).json({
            //     error: "Ocurrió un error en la solicitud.",
            // });
        }
    }

    const firstArticles = articles;
    const newPage = { name, imageSite, urlSite, firstArticles };
    container.push(newPage);

    console.log(container);

    await browser.close();
}

// scrollDownAndGetImages("https://ambito.com",".news-article > figure > a > .figure-img");

await solicitudURL(dataInfobae);

// app.get("/api/data", async (req, res) => {
//     await solicitudURL(dataInfobae, res);

//     res.json(container);
// });

// module.exports = app;
// export default app;
