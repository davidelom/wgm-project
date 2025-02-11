const pool = require("../config/db");

const getAllTournamentsService = async () => {
    const result = await pool.query("SELECT * FROM tournament");
    return result.rows;
};

const getTournamentByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM tournament WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
};

const getTournamentWithPartiesService = async (tournament_id) => {
    const result = await pool.query(
        `SELECT t.*, p.id AS party_id, p.party_name
        FROM tournament t
        LEFT JOIN registered r ON t.id = r.tournament_id
        LEFT JOIN parties p ON r.party_id = p.id
        WHERE t.id = $1`,
        [tournament_id]
    );
    return result.rows;
};

const createTournamentService = async (start_date, end_date) => {
    const result = await pool.query(
        "INSERT INTO tournament (start_date, end_date) VALUES ($1, $2) RETURNING *",
        [start_date, end_date]
    );
    return result.rows[0];
};

const updateTournamentService = async (id, updatedFields) => {
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
    const query = `UPDATE tournament SET ${fields.join(
        ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteTournamentService = async (id) => {
    const result = await pool.query("DELETE FROM tournament WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
};

module.exports = {
    getAllTournamentsService,
    getTournamentByIdService,
    createTournamentService,
    updateTournamentService,
    deleteTournamentService,
    getTournamentWithPartiesService,
};
