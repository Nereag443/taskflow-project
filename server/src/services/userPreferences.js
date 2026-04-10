let userPreferences = {
    darkMode: false,
    avatar: null,
};

function getUserPreferences() {
    return userPreferences;
}

function updateUserPreferences(darkMode, avatar) {
    if (darkMode !== undefined) userPreferences.darkMode = darkMode;
    if (avatar !== undefined) userPreferences.avatar = avatar;
    return userPreferences;
}

module.exports = {
    getUserPreferences,
    updateUserPreferences
};