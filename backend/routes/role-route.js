const express = require("express");
const router = express.Router();

const { getAllRoles, getRoleById } = require("../controllers/role-controller");

router.get("/", getAllRoles);
router.get("/:id", getRoleById);

module.exports = router;
