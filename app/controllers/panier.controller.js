import datamapper from "../datamapper.js";

const panierController = {
  async showCart(req, res) {
    try {
      const items = await datamapper.getCart();
      const total = items.reduce((sum, item) => sum + Number(item.prix_kg) * item.quantite, 0);
      res.render("panier", { items, total });
    } catch (error) {
      console.trace(error);
      res.status(500).send("Erreur lors de l'affichage du panier");
    }
  },

  async addToCart(req, res) {
    const cafeId = parseInt(req.params.cafeId);
    try {
      await datamapper.addToCart(cafeId, 1);
      res.redirect("/panier");
    } catch (error) {
      console.trace(error);
      res.status(500).send("Erreur lors de l'ajout au panier");
    }
  },

  async clearCart(req, res) {
    try {
      await datamapper.clearCart();
      res.redirect("/panier");
    } catch (error) {
      console.trace(error);
      res.status(500).send("Erreur lors du vidage du panier");
    }
  },

  async removeOne(req, res) {
    const cafeId = parseInt(req.params.cafeId);
    try {
      await datamapper.removeOneFromCart(cafeId);
      res.redirect("/panier");
    } catch (error) {
      console.trace(error);
      res.status(500).send("Erreur lors de la suppression d’un produit du panier");
    }
  },
  
  async getCartCount(_req, res) {
    try {
      const count = await datamapper.getCartCount();
      res.json({ count });
    } catch (error) {
      console.trace(error);
      res.status(500).json({ count: 0 });
    }
  }
};

export default panierController;
