const PORT = process.env.PORT || 8000;


import express from 'express'
export const app = express();

import cors from 'cors';

import { fetchNewsPuppeteer } from '../utils/fetchNewsPuppeteer.js'
//import { solicitudURL } from '../utils/solicitudURL.js';
import {dataInfobae, dataPagina12, dataClarin, dataAmbito, dataPerfil} from '../dataSites.js'
import { container } from '../utils/container.js';

app.use(cors());

// app.METHOD(PATH, HANDLER);

app.get("/", function (req, res) {
    res.json("This is my webscraper with node");
});


app.get("/api/data", async (req, res) => {
	await fetchNewsPuppeteer(dataInfobae, res, container);
	await fetchNewsPuppeteer(dataPagina12, res, container);
	await fetchNewsPuppeteer(dataClarin, res, container);
	await fetchNewsPuppeteer(dataAmbito, res, container);
	await fetchNewsPuppeteer(dataPerfil, res, container);
	res.json(container);
});

// app.listen(PORT, () =>
//     console.log(`Servidor escuchando en el puerto: ${PORT}`)
// );

 export default app;
