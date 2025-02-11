const {
    createPartyService,
    deletePartyService,
    getAllPartiesService,
    getPartyByIdService,
    updatePartyService,
    addPartyToTournamentService,
    saveGeneratedPartiesService,
    getAllPartiesWithCharactersService,
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

const addPartyToTournament = async (req, res, next) => {
    try {
        const { tournament_id, party_id } = req.body;
        if (!tournament_id || !party_id) {
            return handleResponse(res, 400, "Missing required fields");
        }
        const newRegistration = await addPartyToTournamentService(
            tournament_id,
            party_id
        );
        handleResponse(
            res,
            201,
            "Party registered to tournament successfully",
            newRegistration
        );
    } catch (err) {
        next(err);
    }
};

const getAllPartiesWithCharacters = async (req, res, next) => {
    try {
        const parties = await getAllPartiesWithCharactersService();
        handleResponse(
            res,
            200,
            "Parties with characters retrieved successfully",
            parties
        );
    } catch (err) {
        next(err);
    }
};

const saveGeneratedParties = async (req, res, next) => {
    const { number } = req.body;
    if (!number || number <= 0) {
        return handleResponse(res, 400, "Invalid number of teams");
    }

    try {
        const parties = await saveGeneratedPartiesService(number);

        if (!parties) {
            return handleResponse(res, 400, "");
        }

        console.log(parties);

        handleResponse(
            res,
            201,
            "Teams generated and saved successfully",
            parties
        );
    } catch (error) {
        res.status(500).json({
            error: "Error while generating and saving teams.",
        });
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
        const party = req.body;
        if (!party) {
            return handleResponse(res, 400, "Missing required fields");
        }
        const newParty = await createPartyService(party);
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
    addPartyToTournament,
    saveGeneratedParties,
    getAllPartiesWithCharacters,
};
