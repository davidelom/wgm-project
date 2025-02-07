const {
    createPlayerService,
    getAllPlayersService,
    getPlayerByIdService,
    updatePlayerService,
    deletePlayerService,
    getPlayerByEmailService,
} = require("../models/player-model");
const bcrypt = require("bcrypt");

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

const loginPlayer = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const player = await getPlayerByEmailService(email);
        if (!player) return handleResponse(res, 404, "Player not found");

        const isMatch = await bcrypt.compare(password, player.password);

        if (!isMatch) return handleResponse(res, 400, "Invalid credentials");

        const playerData = {
            id: player.id,
            username: player.username,
            email: player.email,
        };

        handleResponse(res, 200, "Player logged in successfully", playerData);
    } catch (err) {
        next(err);
    }
};

const registerPlayer = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return handleResponse(res, 400, "Missing required fields");
        }

        const existingPlayer = await getPlayerByEmailService(email);
        if (existingPlayer) {
            return handleResponse(
                res,
                400,
                "Email already exists, please login"
            );
        }

        const newPlayer = await createPlayerService(username, email, password);

        handleResponse(res, 201, "Player created successfully", {
            id: newPlayer.id,
            username: newPlayer.username,
            email: newPlayer.email,
        });
    } catch (err) {
        next(err);
    }
};

const getAllPlayers = async (req, res, next) => {
    try {
        const players = await getAllPlayersService();
        if (players.length === 0)
            return handleResponse(res, 404, "No players found");

        players.forEach((player) => {
            delete player.password;
        });
        handleResponse(res, 200, "Players fetched successfully", players);
    } catch (err) {
        next(err);
    }
};

const getPlayerById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const player = await getPlayerByIdService(id);
        if (!player) return handleResponse(res, 404, "Player not found");

        const playerData = {
            id: player.id,
            username: player.username,
            email: player.email,
        };
        handleResponse(res, 200, "Player retrieved successfully", playerData);
    } catch (err) {
        next(err);
    }
};

const updatePlayer = async (req, res, next) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const play = await getPlayerByIdService(id);
        if (!play) return handleResponse(res, 404, "Player not found");

        const updatedFields = {};
        if (username) updatedFields.username = username;
        if (email) updatedFields.email = email;
        if (password) {
            if (password.trim() === "") {
                return handleResponse(
                    res,
                    400,
                    "Le mot de passe ne peut pas être vide"
                );
            }
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(password, salt);
        }

        if (Object.keys(updatedFields).length === 0) {
            return handleResponse(res, 400, "Aucune donnée à mettre à jour");
        }

        const updatedPlayer = await updatePlayerService(id, updatedFields);

        if (!updatedPlayer) return handleResponse(res, 404, "Player not found");

        const playerData = {
            id: updatedPlayer.id,
            username: updatedPlayer.username,
            email: updatedPlayer.email,
        };

        handleResponse(res, 200, "Player updated successfully", playerData);
    } catch (err) {
        next(err);
    }
};

const deletePlayer = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedPlayer = await deletePlayerService(id);
        handleResponse(res, 200, "Player deleted successfully", deletedPlayer);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
    loginPlayer,
    registerPlayer,
};
