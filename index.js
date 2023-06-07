const PORT = 8000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const url = "https://www.infobae.com/";
axios(url)
    .then((res) => {
        const html = res.data;
        console.log(html);
        const $ = cheerio.load(html);
        const articles = [];

        $(".d23-story-card-info", html).each(function () {
            const title = $(this).text();
            const url = $(this).find("a").attr("href");
            articles.push({
                title,
                url,
            });
        });

        console.log(articles);
    })
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running in port: ${PORT}`));
