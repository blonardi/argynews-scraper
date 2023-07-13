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

// async function getData() {
//     const browser = await puppeteer.launch({
//         headless: false,
//         slowMo: 200,
//     });
//     const page = await browser.newPage();
//     // await page.goto("https://ambito.com");
//     await page.goto("https://ambito.com", { waitUntil: "networkidle0" });

//     // await page.waitForSelector(".news-article figure .figure-img");

//     const result = await page.evaluate(() => {
//         let imgs = document.querySelectorAll(
//             ".news-article > figure > a > .figure-img"
//         );
//         const array = [...imgs];
//         // console.log(array);
//         const imagenesObj = [];
//         const imagenes = array.map((img, i) => {
//             let src = img.getAttribute("src");
//             imagenesObj.push([i, src]);
//         });
//         return imagenesObj;
//     });

//     console.log(result);
//     await browser.close();
// }

// getData();

async function scrollDownAndGetImages() {
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200,
    });
    const page = await browser.newPage();

    await page.goto("https://ambito.com");

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

    // Extrae las imágenes después de realizar el desplazamiento
    // const imagenesObj = [];
    // const imageUrls = await page.$$eval(
    //     ".news-article > figure > a > .figure-img",
    //     (imgs) => imgs.map((img) => imagenesObj.push(img.src))
    // );

    // const imgsSrc = await page.$$eval(
    //     ".news-article > figure > a > .figure-img",
    //     (imgs) =>
    //         imgs.map((img, i) => {
    //             let src = img.getAttribute("src");
    //             imagenesObj.push({i, src});
    //         })
    //     return imagenesObj;
    // );
    // imageUrls();
    // console.log(imagenesObj);

    const imageUrls = await page.$$eval(
        ".news-article > figure > a > .figure-img",
        (imgs) => imgs.map((img) => img.src)
    );

    console.log(imageUrls);

    await browser.close();
}

scrollDownAndGetImages();
