const express = require("express");
const router = express.Router();

const {
    createTournament,
    deleteTournament,
    getAllTournaments,
    getTournamentById,
    updateTournament,
} = require("../controllers/tournament-controller");

router.get("/", getAllTournaments);
router.get("/:id", getTournamentById);
router.post("/", createTournament);
router.put("/:id", updateTournament);
router.delete("/:id", deleteTournament);

module.exports = router;
