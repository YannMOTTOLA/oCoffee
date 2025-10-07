import express from 'express';
import homeController from '../controllers/home.controller.js';
import cafeController from '../controllers/catalog.controller.js';
import panierController from '../controllers/panier.controller.js';
import aboutController from '../controllers/about.controller.js';

const router = express.Router();

router.get('/', homeController.homePage);
router.get('/catalog', cafeController.catalog);
router.get('/catalog/:cafeId', cafeController.details);

router.get('/panier', panierController.showCart);
router.post('/panier/add/:cafeId', panierController.addToCart);
router.get('/panier/remove/:cafeId', panierController.removeOne);
router.post('/panier/clear', panierController.clearCart);
router.get('/panier/count', panierController.getCartCount);

router.get('/about', aboutController.about);

export default router;
