const NODE_ENV  = process.env.NODE_ENV

const localUrl = 'http://localhost:8080/api/data'
const vercelUrl = "https://simple-express-scraper-blonardi.vercel.app/api/data";
const urlToFetch = NODE_ENV === 'development' ? localUrl : vercelUrl

export async function getArticles() {
    const response = await fetch(urlToFetch);
    const data = await response.json();
    return data;
}

export const defaultImageUrl =
    "https://www.alcaldianeiva.gov.co/NuestraAlcaldia/SalaDePrensa/PublishingImages/$$PRUEBA%20NOTICIA.png";
