const pool = require("../config/db");
const bcrypt = require("bcrypt");

const getAllPlayersService = async () => {
    const result = await pool.query("SELECT * FROM players");
    return result.rows;
};

const getPlayerByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM players WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
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
const getPlayerByEmailService = async (email) => {
    const result = await pool.query("SELECT * FROM players WHERE email = $1", [
        email,
    ]);
    return result.rows[0];
};

const createPlayerService = async (username, email, password) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await pool.query(
        "INSERT INTO players (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, passwordHash]
    );
    return result.rows[0];
};

const updatePlayerService = async (id, updatedFields) => {
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
    const query = `UPDATE players SET ${fields.join(
        ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
};

const deletePlayerService = async (id) => {
    const result = await pool.query("DELETE FROM players WHERE id = $1", [id]);
    return result.rows[0];
};

module.exports = {
    getAllPlayersService,
    getPlayerByIdService,
    createPlayerService,
    updatePlayerService,
    deletePlayerService,
    getPlayerByEmailService,
};
