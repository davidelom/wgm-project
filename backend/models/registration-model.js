const pool = require("../config/db");

const getAllRegistrationsService = async () => {
    const result = await pool.query("SELECT * FROM registered");
    return result.rows;
};

const getRegistrationByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM registered WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
};

const createRegistrationService = async (
    tournament_id,
    player_id,
    registration_date
) => {
    const result = await pool.query(
        "INSERT INTO registered (tournament_id, player_id, registration_date) VALUES ($1, $2, $3) RETURNING *",
        [tournament_id, player_id, registration_date]
    );
    return result.rows[0];
};

const updateRegistrationService = async (id, updatedFields) => {
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
    const query = `UPDATE registered SET ${fields.join(
        ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteRegistrationService = async (id) => {
    const result = await pool.query("DELETE FROM registered WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
};

module.exports = {
    getAllRegistrationsService,
    getRegistrationByIdService,
    createRegistrationService,
    updateRegistrationService,
    deleteRegistrationService,
};
