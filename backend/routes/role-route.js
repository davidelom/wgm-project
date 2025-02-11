const express = require("express");
const router = express.Router();

const {
    getAllRoles,
    getRoleById,
    getRolesByClass,
} = require("../controllers/role-controller");

router.get("/", getAllRoles);
router.get("/:id", getRoleById);
router.get("/class/:class_id", getRolesByClass);

module.exports = router;
