const {
    createTournamentService,
    deleteTournamentService,
    getAllTournamentsService,
    getTournamentByIdService,
    updateTournamentService,
} = require("../models/tournament-model");

const handleResponse = require("../utils/handle-response-function");

const getAllTournaments = async (req, res, next) => {
    try {
        const tournaments = await getAllTournamentsService();
        handleResponse(
            res,
            200,
            "Tournaments retrieved successfully",
            tournaments
        );
    } catch (err) {
        next(err);
    }
};

const getTournamentById = async (req, res, next) => {
    try {
        const tournament = await getTournamentByIdService(req.params.id);
        if (!tournament)
            return handleResponse(res, 404, "Tournament not found");
        handleResponse(
            res,
            200,
            "Tournament retrieved successfully",
            tournament
        );
    } catch (err) {
        next(err);
    }
};

const createTournament = async (req, res, next) => {
    try {
        const { start_date, end_date } = req.body;
        if (!start_date || !end_date) {
            return handleResponse(res, 400, "Missing required fields");
        }
        const newTournament = await createTournamentService(
            start_date,
            end_date
        );
        handleResponse(
            res,
            201,
            "Tournament created successfully",
            newTournament
        );
    } catch (err) {
        next(err);
    }
};

const updateTournament = async (req, res, next) => {
    try {
        const updatedTournament = await updateTournamentService(
            req.params.id,
            req.body
        );
        if (!updatedTournament)
            return handleResponse(res, 404, "Tournament not found");
        handleResponse(
            res,
            200,
            "Tournament updated successfully",
            updatedTournament
        );
    } catch (err) {
        next(err);
    }
};

const deleteTournament = async (req, res, next) => {
    try {
        const deletedTournament = await deleteTournamentService(req.params.id);
        if (!deletedTournament)
            return handleResponse(res, 404, "Tournament not found");
        handleResponse(
            res,
            200,
            "Tournament deleted successfully",
            deletedTournament
        );
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllTournaments,
    getTournamentById,
    createTournament,
    updateTournament,
    deleteTournament,
};
