import datamapper from "../datamapper.js";

const cafeController = {
    async catalog(req, res) {
        try {
            const cafes = await datamapper.findAllcoffee();
            res.render('catalog', { cafes });
        } catch (error) {
            console.trace(error);
            res.status(500).send('Erreur lors de la récupération des cafes');
        }

    },

    async details(req, res) {
        const cafeId = parseInt(req.params.cafeId);
        try {
            const cafes = await datamapper.coffeeDetailsById(cafeId);
            const cats = cafes.map((cafe) =>{
                return cafe.caracteristique_libelle
            })
            
            res.render('details', {cafe: cafes[0], cats}); 
        } catch (error) {
            console.trace(error);
            res.status(500).send('Erreur lors de la récupération des cafes');
        }
    }


}
export default cafeController;