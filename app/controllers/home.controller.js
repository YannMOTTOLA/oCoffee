import datamapper from "../datamapper.js";

const mainController = {
  async homePage(req, res) {
    try {
      const cafes = await datamapper.findFirst3coffee();   
      const cafesForMap = await datamapper.findAllcoffee(); 
      res.render("home", { cafes, cafesForMap });
    } catch (error) {
      console.trace(error);
      res.status(500).send("Erreur lors de la récupération des cafés");
    }
  }
};

export default mainController;