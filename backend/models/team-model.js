const pool = require("../config/db");

const getAllTeamsService = async () => {
    const result = await pool.query("SELECT * FROM parties");
    return result.rows;
};

const getTeamByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM parties WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
};

const createTeamService = async (captain_id) => {
    const result = await pool.query(
        "INSERT INTO parties (captain_id) VALUES ($1) RETURNING *",
        [captain_id]
    );
    return result.rows[0];
};

const updateTeamService = async (id, updatedFields) => {
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
    const query = `UPDATE parties SET ${fields.join(
        ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteTeamService = async (id) => {
    const result = await pool.query("DELETE FROM parties WHERE id = $1", [id]);
    return result.rows[0];
};

module.exports = {
    getAllTeamsService,
    getTeamByIdService,
    createTeamService,
    updateTeamService,
    deleteTeamService,
};
