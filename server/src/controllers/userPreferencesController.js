const { obtenerPreferencias, actualizarPreferencias } = require('../services/userPreferences')

const getUserPreferences = async (req, res) => {
  try {
    res.json(obtenerPreferencias())
  } catch (error) {
    console.error("Error fetching user preferences:", error)
    res.status(500).json({ error: "Failed to fetch user preferences" })
  }
}

const updateUserPreferences = async (req, res) => {
  try {
    const updated = actualizarPreferencias(req.body)
    res.json(updated)
  } catch (error) {
    console.error("Error updating user preferences:", error)
    res.status(500).json({ error: "Failed to update user preferences" })
  }
}

module.exports = {
  getUserPreferences,
  updateUserPreferences,
}