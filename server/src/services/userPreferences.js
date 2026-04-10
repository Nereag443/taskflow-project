let userPreferences = {
    darkMode: false,
    avatar: null,
};

function getUserPreferences() {
    return userPreferences;
}

function updateUserPreferences(data) {
    if (data.darkMode !== undefined) userPreferences.darkMode = data.darkMode;
    if (data.avatar !== undefined) userPreferences.avatar = data.avatar;
    return userPreferences;
}

module.exports = {
    getUserPreferences,
    updateUserPreferences
};