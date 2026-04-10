let userPreferences = {
    theme: "light",
    userAvatar: "avatar1.png",
    username: "",
    fullName: "",
    email: "",
    password: "",
};

function getUserPreferences() {
    return userPreferences;
}

function updateUserPreferences(data) {
    if (data.theme !== undefined) userPreferences.theme = data.theme;
    if (data.userAvatar !== undefined) userPreferences.userAvatar = data.userAvatar;
    return userPreferences;
}

module.exports = {
    getUserPreferences,
    updateUserPreferences
};