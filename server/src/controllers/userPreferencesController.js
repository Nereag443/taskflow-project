let userPreferences = {
    darkMode: false,
    avatar: null,
};

const getUserPreferences = async (req, res) => {
    try {
    res.json(userPreferences);
    } catch (error) {
        console.error("Error fetching user preferences:", error);
        res.status(500).json({ error: "Failed to fetch user preferences" });
    }
}

const updateUserPreferences = async (req, res) => {
    try {
    const {darkMode, avatar} = req.body;
    if (darkMode !== undefined) userPreferences.darkMode = darkMode;
    if (avatar !== undefined) userPreferences.avatar = avatar;
    
    res.json(userPreferences);
    } catch (error) {
        console.error("Error updating user preferences:", error);
        res.status(500).json({ error: "Failed to update user preferences" });
    }
}

module.exports = {
    getUserPreferences,
    updateUserPreferences
};