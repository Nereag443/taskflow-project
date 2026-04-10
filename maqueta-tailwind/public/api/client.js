const API_BASE = "";

async function getTasks() {
  try {
    const response = await fetch(`${API_BASE}/api/v1/tasks`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
    } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
    }
};

async function createTask(task) {
  try {
    const response = await fetch(`${API_BASE}/api/v1/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
};

async function deleteTask(id) {
  try {
    const response = await fetch(`${API_BASE}/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting task:", error);
    return null;
  }
};

async function getUserPreferences() {
  try {
    const response = await fetch(`${API_BASE}/api/v1/user/preferences`);
    if (!response.ok) {
      throw new Error("Failed to fetch user preferences");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    return null;
  }
};

async function updateUserPreferences(preferences) {
  try {
    const response = await fetch(`${API_BASE}/api/v1/user/preferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });
    if (!response.ok) {
      throw new Error("Failed to update user preferences");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating user preferences:", error);
    return null;
  }
};

window.getTasks = getTasks;
window.createTask = createTask;
window.deleteTask = deleteTask;
window.getUserPreferences = getUserPreferences;
window.updateUserPreferences = updateUserPreferences;