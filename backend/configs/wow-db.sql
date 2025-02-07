CREATE DATABASE wow_db;

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    label VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE class (
    id SERIAL PRIMARY KEY,
    label VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    class_id INT REFERENCES class(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    ilvl INT CHECK (ilvl BETWEEN 0 AND 645),
    rio INT CHECK (rio BETWEEN 0 AND 4500)
);

CREATE TABLE belong_to (
    character_id INT REFERENCES characters(id) ON DELETE CASCADE,
    player_id INT REFERENCES players(id) ON DELETE CASCADE,
    PRIMARY KEY (character_id, player_id)
);

CREATE TABLE tournament (
    id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE registered (
    id SERIAL PRIMARY KEY,
    registration_date DATE NOT NULL
);

CREATE TABLE parties (
    id SERIAL PRIMARY KEY,
    captain_id INT REFERENCES players(id) ON DELETE SET NULL
);

CREATE TABLE compose (
    parties_id INT REFERENCES parties(id) ON DELETE CASCADE,
    characters_id INT REFERENCES characters(id) ON DELETE CASCADE,
    PRIMARY KEY (parties_id, characters_id)
);

-- Insert predefined data from JSON
INSERT INTO class (label) VALUES
    ('Guerrier'), ('Paladin'), ('Chasseur'), ('Voleur'), ('Prêtre'), ('Chaman'), ('Mage'), ('Démoniste'), ('Moine'), ('Druide'), ('Chasseur de démon'), ('Chevalier de la mort'), ('Évocateur');

INSERT INTO roles (label) VALUES
    ('tank'), ('damage'), ('healer');

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
    (2, 13), (3, 13); -- Évocateur
