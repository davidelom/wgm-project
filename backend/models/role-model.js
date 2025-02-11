const pool = require("../config/db");

const getAllRolesService = async () => {
    const result = await pool.query("SELECT * FROM roles");
    return result.rows;
};

const getRoleByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM roles WHERE id = $1", [id]);
    return result.rows[0];
};

const getRolesByClassService = async (class_id) => {
    const classResult = await pool.query(
        "SELECT * FROM classes WHERE id = $1",
        [class_id]
    );

    if (classResult.rows.length === 0) {
        throw new Error("Class not found");
    }

    const role_id = await pool.query(
        "SELECT role_id FROM can_be WHERE class_id = $1",
        [class_id]
    );

    const roles = await pool.query("SELECT * FROM roles WHERE id = ANY($1)", [
        role_id.rows.map((row) => row.role_id),
    ]);

    return roles.rows;
};

module.exports = {
    getAllRolesService,
    getRoleByIdService,
    getRolesByClassService,
};
