const PORT = process.env.PORT || 8000;


import express from 'express'
export const app = express();

import cors from 'cors';

import { fetchNewsPuppeteer, closeBrowser } from '../utils/fetchNewsPuppeteer.js'
//import { solicitudURL } from '../utils/solicitudURL.js';
import { dataInfobae, dataPagina12, dataClarin, dataAmbito, dataPerfil } from '../dataSites.js'
import { container } from '../utils/container.js';

app.use(cors());

// app.METHOD(PATH, HANDLER);

app.get("/", function (req, res) {
	res.json("This is my webscraper with node");
});


//app.get("/api/data", async (req, res) => {
//	try {
//		const promises = [
//			//fetchNewsPuppeteer(dataInfobae, res, container),
//			//fetchNewsPuppeteer(dataPagina12, res, container),
//			//fetchNewsPuppeteer(dataClarin, res, container),
//			//fetchNewsPuppeteer(dataAmbito, res, container),
//			//fetchNewsPuppeteer(dataPerfil, res, container)
//		];
//		// Aquí puedes hacer lo que necesites con el resultado de la promesa
//		//console.log("Resultado de la promesa:", result);

//		// Envía el resultado al cliente
//		// Esperar a que todas las promesas se resuelvan
//		//const results = await Promise.allSettled(promises);
//		//console.log({results});

//		// Mapear los resultados y devolver los valores o errores
//		//const mappedResults = promises.map(promise => {
//		//  if (promise.status === "fulfilled") {
//		//    return promise.value; // Devolver el valor de la promesa resuelta
//		//  } else {
//		//    return promise.reason; // Devolver el motivo del rechazo de la promesa
//		//  }
//		//});
//		//// Enviar los resultados mapeados al cliente
//		//res.json(mappedResults);

//		// Llamar a fetchNewsPuppeteer y esperar a que se resuelva la promesa
//		await fetchNewsPuppeteer(dataInfobae, res, container);

//		// Mostrar el array container como respuesta
//		res.json(container);

//	} catch (error) {
//		console.error("Error al obtener datos:", error);
//		res.status(500).json({ error: "Error al obtener datos" });
//	}
//});
app.get("/api/data", async (req, res) => {
	const container = [];

	try {
		const sitesToScrape = [dataInfobae, dataPagina12, dataClarin, dataAmbito, dataPerfil];

		// Limitar la concurrencia de las promesas
		const chunkSize = 2;
		for (let i = 0; i < sitesToScrape.length; i += chunkSize) {
			const chunk = sitesToScrape.slice(i, i + chunkSize);
			const results = await Promise.all(chunk.map(site => fetchNewsPuppeteer(site).catch(err => ({ error: err.message }))));
			results.forEach((result, index) => {
				console.log(`Procesando resultado ${index}:`, result);
				if (!result.error) {
					container.push(result);
				} else {
					console.error(`Error en la promesa ${index}:`, result.error);
				}
			});
		}

		res.json(container);
	} catch (error) {
		console.error("Error al obtener datos:", error);
		res.status(500).json({ error: "Error al obtener datos" });
	}
});

process.on('SIGINT', async () => {
	await closeBrowser();
	process.exit();
});


app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
