
# O'Coffee

Ce projet est une application web développée avec **Node.js**, **Express** et **EJS**.
Elle affiche un catalogue de cafés, leurs détails et un panier d’achat simulé.

---

## Démarrer le projet

### Installation

Clonez le dépôt et installez les dépendances :

```bash
git clone https://github.com/<votre-utilisateur>/OCoffee.git
cd OCoffee
npm install
```

### Lancer le serveur de développement

```bash
npm run dev
# ou
node index.js
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

---

## Structure du projet

* `app/` : contrôleurs, routes et vues EJS
* `public/` : fichiers statiques (CSS, images, scripts)
* `create_db.sql` : script de création de la base PostgreSQL
* `index.js` : point d’entrée du serveur
* `.env.example` : exemple de configuration d’environnement

---

## En savoir plus

Ce projet utilise **Express** pour le routage, **EJS** pour les vues et **PostgreSQL** pour la base de données.
Pour plus d’informations, consultez la documentation officielle de [Express](https://expressjs.com/fr/) et [EJS](https://ejs.co/).


