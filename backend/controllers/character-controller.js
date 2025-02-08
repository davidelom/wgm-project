const {
    createCharacterService,
    getAllCharactersService,
    getCharacterByIdService,
    updateCharacterService,
    deleteCharacterService,
} = require("../models/character-model");

const handleResponse = require("../utils/handle-response-function");
const createCharacter = async (req, res, next) => {
    try {
        const { name, class_id, role_id, ilvl, rio, player_id } = req.body;
        console.log(req.body);

        if (!name || !class_id || !role_id || !ilvl || !rio || !player_id) {
            return handleResponse(res, 400, "Missing required fields");
        }

        const newCharacter = await createCharacterService(
            name,
            class_id,
            role_id,
            ilvl,
            rio,
            player_id
        );

        handleResponse(
            res,
            201,
            "Character created successfully",
            newCharacter
        );
    } catch (err) {
        next(err);
    }
};

const getAllCharacters = async (req, res, next) => {
    try {
        const characters = await getAllCharactersService();

        if (characters.length === 0) {
            return handleResponse(res, 404, "No characters found");
        }

        handleResponse(
            res,
            200,
            "Characters retrieved successfully",
            characters
        );
    } catch (err) {
        next(err);
    }
};

const getCharacterById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const character = await getCharacterByIdService(id);

        if (!character) {
            return handleResponse(res, 404, "Character not found");
        }

        handleResponse(res, 200, "Character retrieved successfully", character);
    } catch (err) {
        next(err);
    }
};

const updateCharacter = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;

        const updatedCharacter = await updateCharacterService(
            id,
            updatedFields
        );

        handleResponse(
            res,
            200,
            "Character updated successfully",
            updatedCharacter
        );
    } catch (err) {
        next(err);
    }
};

const deleteCharacter = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCharacter = await deleteCharacterService(id);

        handleResponse(
            res,
            200,
            "Character deleted successfully",
            deletedCharacter
        );
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacter,
    deleteCharacter,
};
