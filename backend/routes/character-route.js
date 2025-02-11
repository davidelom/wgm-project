const express = require("express");
const router = express.Router();

const {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    getCharactersByPlayer,
    addCharacterToParty,
} = require("../controllers/character-controller");

router.get("/", getAllCharacters);
router.get("/:id", getCharacterById);
router.post("/", createCharacter);
router.put("/:id", updateCharacter);
router.delete("/:id", deleteCharacter);
router.get("/player/:player_id", getCharactersByPlayer);
router.post("/add-to-party", addCharacterToParty);

module.exports = router;
