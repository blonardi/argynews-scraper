import puppeteer, { PuppeteerNode } from "puppeteer";

// async function openWebPage() {
//     const browser = await puppeteer.launch({
//         headless: false,
//         slowMo: 200,
//     });
//     const page = await browser.newPage();
//     await page.goto("https://google.com");
//     await browser.close();
// }

// openWebPage();

async function getData() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200,
    });
    const page = await browser.newPage();
    await page.goto("https://ambito.com");
    const result = await page.evaluate(() => {
        let imgs = document.querySelectorAll(
            ".news-article > figure > a > .figure-img"
        );
        const array = [...imgs];
        // console.log(array);
        const imagenesObj = [];
        const imagenes = array.map((img, i) => {
            let src = img.getAttribute("src");
            imagenesObj.push([i, src]);
        });

        return imagenesObj;
    });
    console.log(result);
    await browser.close();
}

getData();
