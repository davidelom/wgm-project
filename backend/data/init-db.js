// data/init-db.js
const pool = require("../config/db");

const createTables = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS players (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE
            );

            CREATE TABLE IF NOT EXISTS roles (
                id SERIAL PRIMARY KEY,
                label VARCHAR(50) NOT NULL UNIQUE
            );

            CREATE TABLE IF NOT EXISTS class (
                id SERIAL PRIMARY KEY,
                label VARCHAR(50) NOT NULL UNIQUE
            );

            CREATE TABLE IF NOT EXISTS characters (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                class_id INT REFERENCES class(id) ON DELETE CASCADE,
                role_id INT REFERENCES roles(id) ON DELETE CASCADE,
                ilvl INT CHECK (ilvl BETWEEN 0 AND 645),
                rio INT CHECK (rio BETWEEN 0 AND 4500)
            );

            CREATE TABLE IF NOT EXISTS belong_to (
                character_id INT REFERENCES characters(id) ON DELETE CASCADE,
                player_id INT REFERENCES players(id) ON DELETE CASCADE,
                PRIMARY KEY (character_id, player_id)
            );

            CREATE TABLE IF NOT EXISTS tournament (
                id SERIAL PRIMARY KEY,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL
            );

            CREATE TABLE IF NOT EXISTS registered (
                id SERIAL PRIMARY KEY,
                registration_date DATE NOT NULL
            );

            CREATE TABLE IF NOT EXISTS parties (
                id SERIAL PRIMARY KEY,
                captain_id INT REFERENCES players(id) ON DELETE SET NULL
            );

            CREATE TABLE IF NOT EXISTS compose (
                parties_id INT REFERENCES parties(id) ON DELETE CASCADE,
                characters_id INT REFERENCES characters(id) ON DELETE CASCADE,
                PRIMARY KEY (parties_id, characters_id)
            );

            CREATE TABLE IF NOT EXISTS can_be (
                role_id INT REFERENCES roles(id) ON DELETE CASCADE,
                class_id INT REFERENCES class(id) ON DELETE CASCADE,
                PRIMARY KEY (role_id, class_id)
            );
        `);
        console.log("Tables créées avec succès ou déjà existantes !");
    } catch (err) {
        console.log("Erreur lors de la création des tables :", err);
        // Relance de l'erreur pour que initDB sache que la création a échoué
        throw err;
    }
};

const insertPredefinedData = async () => {
    try {
        await pool.query(`
            INSERT INTO class (label) VALUES
                ('Guerrier'), ('Paladin'), ('Chasseur'), ('Voleur'), ('Prêtre'), ('Chaman'), ('Mage'), 
                ('Démoniste'), ('Moine'), ('Druide'), ('Chasseur de démon'), ('Chevalier de la mort'), ('Évocateur')
            ON CONFLICT (label) DO NOTHING;

            INSERT INTO roles (label) VALUES
                ('tank'), ('damage'), ('healer')
            ON CONFLICT (label) DO NOTHING;

            INSERT INTO can_be (role_id, class_id) VALUES
                (1, 1), (2, 1), -- Guerrier
                (1, 2), (2, 2), (3, 2), -- Paladin
                (2, 3), -- Chasseur
                (2, 4), -- Voleur
                (2, 5), (3, 5), -- Prêtre
                (2, 6), (3, 6), -- Chaman
                (2, 7), -- Mage
                (2, 8), -- Démoniste
                (2, 9), -- Moine
                (1, 10), (2, 10), (3, 10), -- Druide
                (1, 11), (2, 11), -- Chasseur de démon
                (1, 12), (2, 12), -- Chevalier de la mort
                (2, 13), (3, 13) -- Évocateur
            ON CONFLICT (role_id, class_id) DO NOTHING;
        `);
        console.log("Données prédéfinies insérées avec succès !");
    } catch (err) {
        console.log(
            "Erreur lors de l'insertion des données prédéfinies :",
            err
        );
        throw err;
    }
};

const initDB = async () => {
    try {
        await createTables();
        await insertPredefinedData();
    } catch (err) {}
    console.log("Base de données initialisée !");
};

module.exports = {
    initDB,
};
