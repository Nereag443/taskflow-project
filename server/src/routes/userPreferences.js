const express = require("express");
const router = express.Router();

const { getUserPreferences, updateUserPreferences } = require ("../controllers/userPreferencesController.js");

router.get("/", getUserPreferences);
router.post("/", updateUserPreferences);

module.exports = router;
