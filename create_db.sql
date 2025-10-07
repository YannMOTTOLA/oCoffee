DROP TABLE IF EXISTS "cafe_caracteristique";
DROP TABLE IF EXISTS "cafe";
DROP TABLE IF EXISTS "caracteristique";
DROP TABLE IF EXISTS "pays";
DROP TABLE IF EXISTS "panier";

CREATE TABLE IF NOT EXISTS "pays" (
  "id"  SERIAL PRIMARY KEY,
  "nom" VARCHAR(128) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "caracteristique" (
  "id"      SERIAL PRIMARY KEY,
  "libelle" VARCHAR(128) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS "cafe" (
  "id"         SERIAL PRIMARY KEY,
  "reference"  BIGINT       NOT NULL UNIQUE,
  "nom"        VARCHAR(128) NOT NULL,
  "description" TEXT        NOT NULL,
  "prix_kg"    NUMERIC(10,2) NOT NULL CHECK ("prix_kg" > 0),
  "disponible" BOOLEAN      NOT NULL,
  "pays_id"    INT          NOT NULL REFERENCES "pays"("id")
);

CREATE TABLE IF NOT EXISTS "cafe_caracteristique" (
  "cafe_id"            INT NOT NULL REFERENCES "cafe"("id") ON DELETE CASCADE,
  "caracteristique_id" INT NOT NULL REFERENCES "caracteristique"("id"),
  PRIMARY KEY ("cafe_id", "caracteristique_id")
);

CREATE TABLE IF NOT EXISTS "panier" (
  "id" SERIAL PRIMARY KEY,
  "cafe_id" INT NOT NULL REFERENCES "cafe"("id") ON DELETE CASCADE,
  "quantite" INT NOT NULL DEFAULT 1
);

INSERT INTO "pays" ("id","nom") VALUES
(1,'Italie'), (2,'Colombie'), (3,'Éthiopie'), (4,'Brésil'),
(5,'Guatemala'), (6,'Kenya'), (7,'Indonésie'), (8,'Costa Rica'),
(9,'Vietnam'), (10,'Tanzanie'), (11,'Jamaïque'), (12,'Rwanda'),
(13,'Panama'), (14,'Pérou'), (15,'Hawaï'), (16,'Nicaragua')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "caracteristique" ("id","libelle") VALUES
(1,'Corsé'), (2,'Épicé'), (3,'Acide'),
(4,'Doux'), (5,'Fruité'), (6,'Chocolaté')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "cafe"
("id","reference","nom","description","prix_kg","disponible","pays_id") VALUES
(1,100955890,'Espresso','Café fort et concentré préparé en faisant passer de l''eau chaude à travers du café finement moulu.',20.99, TRUE, 1),
(2,100955894,'Columbian','Café moyennement corsé avec une acidité vive et une saveur riche.',18.75, TRUE, 2),
(3,105589090,'Ethiopian Yirgacheffe','Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.',22.50, TRUE, 3),
(4,134009550,'Brazilian Santos','Café doux et lisse avec un profil de saveur de noisette.',17.80, TRUE, 4),
(5,256505890,'Guatemalan Antigua','Café corsé avec des nuances chocolatées et une pointe d''épice.',21.25, TRUE, 5),
(6,295432730,'Kenyan AA','Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.',23.70, TRUE, 6),
(7,302932754,'Sumatra Mandheling','Café profond et terreux avec un corps lourd et une faible acidité.',19.95, TRUE, 7),
(8,327302954,'Costa Rican Tarrazu','Café vif et net avec une finition propre et une acidité vive.',24.50, TRUE, 8),
(9,549549090,'Vietnamese Robusta','Café audacieux et fort avec une saveur robuste distinctive.',16.75, TRUE, 9),
(10,582954954,'Tanzanian Peaberry','Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.',26.80, TRUE, 10),
(11,589100954,'Jamaican Blue Mountain','Reconnu pour sa saveur douce, son acidité vive et son absence d''amertume.',39.25, TRUE, 11),
(12,650753915,'Rwandan Bourbon','Café avec des notes florales prononcées, une acidité vive et un corps moyen.',21.90, TRUE, 12),
(13,795501340,'Panamanian Geisha','Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.',42.00, TRUE, 13),
(14,954589100,'Peruvian Arabica','Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.',19.40, FALSE, 14),
(15,958090105,'Hawaiian Kona','Café rare au goût riche, une acidité douce et des nuances subtiles.',55.75, FALSE, 15),
(16,691550753,'Nicaraguan Maragogipe','Café avec des notes de fruits, une acidité vive et un corps plein.',28.60, FALSE, 16)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "cafe_caracteristique" ("cafe_id","caracteristique_id") VALUES
(1,1), (1,2),
(2,3),
(3,4), (3,5),
(4,4),
(5,1),
(6,4), (6,3),
(7,1),
(8,3),
(9,2),
(10,5), (10,1),
(11,4),
(12,5),
(13,5),
(14,1), (14,6),
(15,4),
(16,1), (16,5)
ON CONFLICT DO NOTHING;