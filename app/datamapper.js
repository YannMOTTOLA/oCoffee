import client from "./db/client.js";

const datamapper = {

  // --- CAFÉS ---

  async findFirst3coffee() {
    const result = await client.query(`
      SELECT * 
      FROM cafe 
      WHERE disponible 
      LIMIT 4
    `);
    return result.rows;
  },

  async findAllcoffee() {
    const result = await client.query(`
      SELECT 
        c.id,
        c.reference,
        c.nom,
        c.description,
        c.prix_kg,
        c.disponible,
        p.nom AS pays_nom
      FROM cafe c
      INNER JOIN pays p ON p.id = c.pays_id
    `);
    return result.rows;
  },

  async coffeeDetailsById(cafeId) {
    const result = await client.query(`
      SELECT
        c.id          AS cafe_id,
        c.reference   AS cafe_reference,
        c.nom         AS cafe_nom,
        c.description AS cafe_description,
        c.prix_kg     AS cafe_prix_kg,
        c.disponible  AS cafe_disponible,
        p.nom         AS pays_nom,
        car.libelle   AS caracteristique_libelle
      FROM cafe c
      INNER JOIN pays p ON p.id = c.pays_id
      LEFT JOIN cafe_caracteristique cc ON cc.cafe_id = c.id
      LEFT JOIN caracteristique car ON car.id = cc.caracteristique_id
      WHERE c.id = ${cafeId}
      ORDER BY c.id;
    `);
    return result.rows;
  },

  // --- PANIER ---
  
  async addToCart(cafeId, quantite = 1) {
    const existing = await client.query(`
      SELECT id, quantite 
      FROM panier 
      WHERE cafe_id = ${cafeId}
    `);

    if (existing.rowCount > 0) {
      await client.query(`
        UPDATE panier 
        SET quantite = quantite + ${quantite} 
        WHERE cafe_id = ${cafeId}
      `);
    } else {
      await client.query(`
        INSERT INTO panier (cafe_id, quantite) 
        VALUES (${cafeId}, ${quantite})
      `);
    }
  },

  async getCart() {
    const { rows } = await client.query(`
      SELECT 
        c.id,
        c.reference,      
        c.nom,
        c.prix_kg,
        p.nom AS pays_nom,
        pa.quantite
      FROM panier pa
      INNER JOIN cafe c ON c.id = pa.cafe_id
      INNER JOIN pays p ON p.id = c.pays_id
      ORDER BY c.id
    `);
    return rows;
  },

  async clearCart() {
    await client.query(`DELETE FROM panier`);
  },

  async getCartCount() {
    const { rows } = await client.query(`
      SELECT COALESCE(SUM(quantite), 0) AS n 
      FROM panier
    `);
    return Number(rows[0].n);
  },

  async removeOneFromCart(cafeId) {
    const existing = await client.query(`
      SELECT quantite 
      FROM panier 
      WHERE cafe_id = ${cafeId}
    `);

    if (existing.rowCount > 0) {
      const q = existing.rows[0].quantite;
      if (q > 1) {
        await client.query(`
          UPDATE panier 
          SET quantite = quantite - 1 
          WHERE cafe_id = ${cafeId}
        `);
      } else {
        await client.query(`
          DELETE FROM panier 
          WHERE cafe_id = ${cafeId}
        `);
      }
    }
  }
};

export default datamapper;
