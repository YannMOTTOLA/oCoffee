import "dotenv/config";

import express from "express";
import router from "./app/routes/router.js";

const app = express();

const PORT = process.env.PORT;

// Cette ligne est obligatoire pour récupérer req.body (sinon il sera vide)
app.use(express.urlencoded({extended: true}));

app.set("views", "./app/views");
app.set("view engine", "ejs");

app.use(express.static('./public'));

// Comment connecter le router à mon fichier index.js ?
app.use('/', router);

// Je lance un écouteur sur le port choisi

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}, allez sur http://localhost:${PORT} pour afficher une page !`)
})