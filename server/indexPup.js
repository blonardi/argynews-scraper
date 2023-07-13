import puppeteer, { PuppeteerNode } from "puppeteer";
async function scrollDownAndGetImages(urlSite, titleClass) {
   // const browser = await puppeteer.launch();
   const browser = await puppeteer.launch({
      headless: false,
      slowMo: 200,
   });
   const page = await browser.newPage();

   // await page.goto("https://ambito.com");
   await page.goto(urlSite);

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

   const cards = await page.$$(".d23-story-card-ctn");

   let container = [];
   for (let card of cards) {
      const title = card.querySelector('.headline-link h2')
      container.push(title)
   }

   console.log(container)

   /*    const imageUrls = await page.$$eval(
         imageClass,
         (imgs) => imgs.map((img) => img.src)
      ); */

   await browser.close();
}
// scrollDownAndGetImages("https://ambito.com",".news-article > figure > a > .figure-img");
scrollDownAndGetImages("https://infobae.com", ".headline-link h2");
