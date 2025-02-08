const pool = require("../config/db");

const getAllPartiesService = async () => {
    const result = await pool.query("SELECT * FROM parties");
    return result.rows;
};

const getPartyByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM parties WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
};

const createPartyService = async (party_name) => {
    const result = await pool.query(
        "INSERT INTO parties (party_name) VALUES ($1) RETURNING *",
        [party_name]
    );
    return result.rows[0];
};

const updatePartyService = async (id, party) => {
    const result = await pool.query(
        "UPDATE parties SET name = $1, date = $2, time = $3, location = $4, description = $5 WHERE id = $6 RETURNING *",
        [
            party.name,
            party.date,
            party.time,
            party.location,
            party.description,
            id,
        ]
    );
    return result.rows[0];
};

const deletePartyService = async (id) => {
    const result = await pool.query("DELETE FROM parties WHERE id = $1", [id]);
    return result.rows[0];
};

module.exports = {
    getAllPartiesService,
    getPartyByIdService,
    createPartyService,
    updatePartyService,
    deletePartyService,
};
