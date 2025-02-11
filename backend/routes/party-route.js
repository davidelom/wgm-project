const express = require("express");
const router = express.Router();

const {
    getAllParties,
    getPartyById,
    createParty,
    updateParty,
    deleteParty,
    addPartyToTournament,
    saveGeneratedParties,
    getAllPartiesWithCharacters,
} = require("../controllers/party-controller");

router.get("/", getAllParties);
router.get("/with_characters", getAllPartiesWithCharacters);
router.get("/:id", getPartyById);
router.post("/", createParty);
router.put("/:id", updateParty);
router.delete("/:id", deleteParty);
router.post("/tournament", addPartyToTournament);
router.post("/generate", saveGeneratedParties);

module.exports = router;
