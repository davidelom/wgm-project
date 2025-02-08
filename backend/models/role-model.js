const pool = require("../config/db");

const getAllRolesService = async () => {
    const result = await pool.query("SELECT * FROM roles");
    return result.rows;
};

const getRoleByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM roles WHERE id = $1", [id]);
    return result.rows[0];
};

module.exports = {
    getAllRolesService,
    getRoleByIdService,
};
