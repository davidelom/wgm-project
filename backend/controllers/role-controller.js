const {
    getAllRolesService,
    getRoleByIdService,
} = require("../models/role-model");
const handleResponse = require("../utils/handle-response-function");

const getAllRoles = async (req, res, next) => {
    try {
        const roles = await getAllRolesService();
        handleResponse(res, 200, "Roles retrieved successfully", roles);
    } catch (err) {
        next(err);
    }
};

const getRoleById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const role = await getRoleByIdService(id);

        if (!role) {
            return handleResponse(res, 404, "Role not found");
        }

        handleResponse(res, 200, "Role retrieved successfully", role);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllRoles,
    getRoleById,
};
