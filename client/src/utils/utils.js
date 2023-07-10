export const myUrl = "/api/data";

export async function getArticles() {
    const response = await fetch(myUrl);
    const data = await response.json();
    return data;
}

export const defaultImageUrl =
    "https://www.alcaldianeiva.gov.co/NuestraAlcaldia/SalaDePrensa/PublishingImages/$$PRUEBA%20NOTICIA.png";
