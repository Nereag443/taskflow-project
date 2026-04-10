const {getUserPreferences: getUserPreferencesService, updateUserPreferences: updateUserPreferencesService} = require("../services/userPreferencesService");

const getUserPreferences = async (req, res) => {
    try {
    res.json(getUserPreferencesService());
    } catch (error) {
        console.error("Error fetching user preferences:", error);
        res.status(500).json({ error: "Failed to fetch user preferences" });
    }
}

const updateUserPreferences = async (req, res) => {
    try {
    const updated = updateUserPreferencesService(req.body);
    res.json(updated);
    } catch (error) {
        console.error("Error updating user preferences:", error);
        res.status(500).json({ error: "Failed to update user preferences" });
    }
}

module.exports = {
    getUserPreferences,
    updateUserPreferences
};