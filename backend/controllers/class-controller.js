const {
    getAllClassesService,
    getClassByIdService,
} = require("../models/class-model");

const handleResponse = require("../utils/handle-response-function");

const getAllClasses = async (req, res, next) => {
    try {
        const classes = await getAllClassesService();
        handleResponse(res, 200, "Classes retrieved successfully", classes);
    } catch (err) {
        next(err);
    }
};

const getClassById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const class_ = await getClassByIdService(id);

        if (!class_) {
            return handleResponse(res, 404, "Class not found");
        }

        handleResponse(res, 200, "Class retrieved successfully", class_);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllClasses,
    getClassById,
};
