import { ref } from "vue";

// Simple helper to read from localStorage
function getFromStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value === "true";
  } catch {
    return false;
  }
}

// Simple helper to set in localStorage
function setInStorage(key, value) {
  try {
    localStorage.setItem(key, value ? "true" : "false");
  } catch {}
}

// State management
const firstLogin = ref(getFromStorage("firstLogin"));
const showTutorial = ref(false); // Always start as false, will be set when needed
const shouldShowTutorialAfterDialogClose = ref(false);

function completeFirstLogin() {
  firstLogin.value = false;
  setInStorage("firstLogin", false);

  // Set flag to show tutorial after dialog closes
  shouldShowTutorialAfterDialogClose.value = true;
}

function showTutorialAfterDialogClose() {
  if (shouldShowTutorialAfterDialogClose.value) {
    // Check if tutorial was previously dismissed
    const tutorialDismissed = getFromStorage("tutorialDismissed");
    if (!tutorialDismissed) {
      showTutorial.value = true;
      setInStorage("showTutorial", true);
    }
    shouldShowTutorialAfterDialogClose.value = false;
  }
}

function hideTutorial() {
  showTutorial.value = false;
  setInStorage("showTutorial", false);
  setInStorage("tutorialDismissed", true);
}

// Function to mark a task as completed based on route
function markTaskCompletedByRoute(currentPath, tasks) {
  if (!currentPath || !Array.isArray(tasks)) return false;

  let hasChanges = false;

  tasks.forEach((task) => {
    if (!task?.route) return;

    // Check if current path matches the task route
    const isMatch =
      currentPath === task.route ||
      currentPath.startsWith(task.route + "/");

    if (isMatch && !task.completed) {
      task.completed = true;
      hasChanges = true;
    }
  });

  return hasChanges;
}

// Function to check if all tasks are completed
function areAllTasksCompleted(tasks) {
  if (!Array.isArray(tasks)) return false;
  return tasks.every((task) => task.completed);
}

export function useFirstUsageWizard() {
  return {
    firstLogin,
    showTutorial,
    completeFirstLogin,
    showTutorialAfterDialogClose,
    hideTutorial,
    markTaskCompletedByRoute,
    areAllTasksCompleted,
  };
}
