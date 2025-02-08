const pool = require("../config/db");

const getAllClassesService = async () => {
    const result = await pool.query("SELECT * FROM classes");
    return result.rows;
};

const getClassByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM classes WHERE id = $1", [
        id,
    ]);
    return result.rows[0];
};

module.exports = {
    getAllClassesService,
    getClassByIdService,
};
