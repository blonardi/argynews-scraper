// const app = import("./src/app");
import app from "./src/app.js";
const PORT = process.env.PORT || 8000;

app.listen(PORT);

// app.get("/");

console.log(`Listen on port ${PORT}`);
