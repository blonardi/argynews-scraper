const PORT = 8000;

const express = require("express");
const app = express();

const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const urlOle = "https://www.ole.com.ar";
const claseOle = "";
const urlNyt = "https://www.nytimes.com/es/";
const claseNyt = "";
const urlDia = "https://www.eldiaonline.com/";
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
                const title = $(this).text();
                const url = $(this).find("a").attr("href");
                articles.push({
                    title,
                    url,
                });
            });
            console.log(articles);
            res.json(articles);
        })
        .catch((err) => console.log(err));
}

app.get("/results", (req, res) => {
    const urlInfobae = "https://www.infobae.com/";
    const claseInfobae = ".d23-story-card-info";
    solicitudURL(urlInfobae, claseInfobae, res);
});

app.listen(PORT, () =>
    console.log(`Servidor escuchando en el puerto : ${PORT}`)
);
