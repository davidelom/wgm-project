const pool = require("../config/db");

const getAllCharactersService = async () => {
    const result = await pool.query("SELECT * FROM characters");
    return result.rows;
};

const getCharacterByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM characters WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
};

const createCharacterService = async (
    name,
    class_id,
    role_id,
    ilvl,
    rio,
    player_id
) => {
    const result = await pool.query(
        "INSERT INTO characters (name, class_id, role_id, ilvl, rio) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, class_id, role_id, ilvl, rio]
    );
    const character = result.rows[0];

    await pool.query(
        "INSERT INTO belong_to (character_id, player_id) VALUES ($1, $2)",
        [character.id, player_id]
    );

    return character;
};

const getCharactersByPlayerService = async (player_id) => {
    const result = await pool.query(
        `SELECT c.* FROM characters c
        JOIN belong_to b ON c.id = b.character_id
        WHERE b.player_id = $1`,
        [player_id]
    );
    return result.rows;
};

const addCharacterToPartyService = async (party_id, character_id) => {
    const result = await pool.query(
        "INSERT INTO compose (parties_id, characters_id) VALUES ($1, $2) RETURNING *",
        [party_id, character_id]
    );
    return result.rows[0];
};

const updateCharacterService = async (id, updatedFields) => {
    if (Object.keys(updatedFields).length === 0) {
        throw new Error("Aucune donnée à mettre à jour");
    }

    const fields = [];
    const values = [];
    let index = 1;

    for (const key in updatedFields) {
        if (updatedFields[key] !== undefined) {
            fields.push(`${key} = $${index}`);
            values.push(updatedFields[key]);
            index++;
        }
    }

    values.push(id);
    const query = `UPDATE characters SET ${fields.join(
        ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteCharacterService = async (id) => {
    const result = await pool.query("DELETE FROM characters WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
};

module.exports = {
    getAllCharactersService,
    getCharacterByIdService,
    createCharacterService,
    updateCharacterService,
    deleteCharacterService,
    getCharactersByPlayerService,
    addCharacterToPartyService,
};
