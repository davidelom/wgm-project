const express = require("express");
const {
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
    registerPlayer,
    loginPlayer,
} = require("../controllers/player-controller");
const { validatePlayer } = require("../middlewares/inputValidator");
const router = express.Router();

router.post("/register", validatePlayer, registerPlayer);
router.post("/login", loginPlayer);
router.get("/", getAllPlayers);
router.get("/:id", getPlayerById);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

module.exports = router;
