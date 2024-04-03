import puppeteer from 'puppeteer';
//import { sanitizerText } from './sanitizerText.js';

export async function fetchNewsPuppeteer(siteData, res, container) {
	const limit = 8;
	const {
			name,
			imageSite,
			clase1,
			clase2,
			clase3,
			imgClase,
			href,
			urlClase,
			urlSite,
	} = siteData;

	try {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			await page.goto(urlSite, { timeout: 60000 });

			// Esperar a que se carguen los elementos
			const selector = clase1 ? clase1 : 'article';
			await page.waitForSelector(selector);

			// Esperar a que se carguen las imágenes
			await page.waitForSelector(imgClase);

			// Extraer datos de la página con Puppeteer
			const articles = await page.$$eval(selector, (elements, clase3, imgClase, href, urlClase, limit) => {
					const filteredArticles = [];
					let count = 0;

					elements.forEach(element => {
							if (count >= limit) return; // Salir del bucle si ya alcanzamos el límite

							const image = element.querySelector(imgClase)?.getAttribute('src');
							const title = element.querySelector(clase3)?.textContent.trim();
							const url = element.querySelector(urlClase)?.getAttribute(href);

							if (image && title && url) {
									filteredArticles.push({ title, url, image });
									count++; // Incrementar el contador de artículos válidos
							}
					});

					return filteredArticles;
			}, clase3, imgClase, href, urlClase, limit);

			await browser.close();

			// Procesar los artículos obtenidos
			const newPage = { name, imageSite, urlSite, firstArticles: articles };

			// Verificar si el sitio ya está en el contenedor
			const isInContainer = container.some((page) => page.name === name);
			if (!isInContainer) {
					container.push(newPage);
			}
	} catch (err) {
		console.error("Error al cargar la página:", err);
		// Maneja el error de tiempo de espera adecuadamente, por ejemplo, respondiendo con un mensaje de error
		res.status(500).json({ error: "Error de tiempo de espera al cargar la página" });
	}
}


