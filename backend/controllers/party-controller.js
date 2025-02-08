const {
    createPartyService,
    deletePartyService,
    getAllPartiesService,
    getPartyByIdService,
    updatePartyService,
} = require("../models/party-model");

const handleResponse = require("../utils/handle-response-function");

const getAllParties = async (req, res, next) => {
    try {
        const parties = await getAllPartiesService();
        handleResponse(res, 200, "Parties retrieved successfully", parties);
    } catch (err) {
        next(err);
    }
};

const getPartyById = async (req, res, next) => {
    try {
        const party_name = await getPartyByIdService(req.params.id);
        if (!party_name) return handleResponse(res, 404, "Party not found");
        handleResponse(res, 200, "Party retrieved successfully", party_name);
    } catch (err) {
        next(err);
    }
};

const createParty = async (req, res, next) => {
    try {
        const { party_name } = req.body;
        if (!party_name) {
            return handleResponse(res, 400, "Missing required fields");
        }
        const newParty = await createPartyService(party_name);
        handleResponse(res, 201, "Party created successfully", newParty);
    } catch (err) {
        next(err);
    }
};

const updateParty = async (req, res, next) => {
    try {
        const { party_name } = req.body;
        const updatedParty = await updatePartyService(
            req.params.id,
            party_name
        );
        if (!updatedParty) return handleResponse(res, 404, "Party not found");
        handleResponse(res, 200, "Party updated successfully", updatedParty);
    } catch (err) {
        next(err);
    }
};

const deleteParty = async (req, res, next) => {
    try {
        const deletedParty = await deletePartyService(req.params.id);
        if (!deletedParty) return handleResponse(res, 404, "Party not found");
        handleResponse(res, 200, "Party deleted successfully", deletedParty);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllParties,
    getPartyById,
    createParty,
    updateParty,
    deleteParty,
};
