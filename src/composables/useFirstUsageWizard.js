import { ref } from "vue";

// Keys
const FIRST_CONGRATS_SHOWN_KEY = "first_usage_congrats_shown";
const FINISHED_KEY = "tutorial_checklist_finished";
const COMPLETED_KEY = "tutorial_checklist_completed"; // now boolean flag (all steps completed)
const DISMISSED_KEY = "tutorial_checklist_dismissed";

// Safe storage helpers
function readFlag(key) {
  try {
    const v = localStorage.getItem(key);
    return v === "true" || v === "1";
  } catch {
    return false;
  }
}

function writeFlag(key, value) {
  try {
    localStorage.setItem(key, value ? "true" : "false");
  } catch {}
}

// First-usage congrats state
const hasShownCongrats = readFlag(FIRST_CONGRATS_SHOWN_KEY);
const firstUsage = ref(!hasShownCongrats);
const confetti = ref(!hasShownCongrats);
const hasCompletedCongrats = ref(hasShownCongrats);

function completeCongrats() {
  confetti.value = false;
  firstUsage.value = false;
  hasCompletedCongrats.value = true;
  writeFlag(FIRST_CONGRATS_SHOWN_KEY, true);
}

// Checklist state
const isFinished = ref(readFlag(FINISHED_KEY));
const congratsVisible = ref(false);
// completed flag is stored as boolean under COMPLETED_KEY
const isChecklistDismissed = ref(
  readFlag(DISMISSED_KEY) || isFinished.value
);

// no per-route persistence anymore

function markAllDone() {
  if (!isFinished.value) {
    congratsVisible.value = true;
  }
}

function setChecklistFinished() {
  if (isFinished.value) return;
  isFinished.value = true;
  writeFlag(FINISHED_KEY, true);
}

function dismissChecklist() {
  isChecklistDismissed.value = true;
  writeFlag(DISMISSED_KEY, true);
}

function applyCompletedToTasks(tasks) {
  if (!Array.isArray(tasks)) return;
  // If the global completed flag or finished flag is true, mark all tasks completed
  const allCompletedFlag =
    readFlag(COMPLETED_KEY) || readFlag(FINISHED_KEY);
  if (allCompletedFlag) {
    tasks.forEach((task) => {
      task.completed = true;
    });
  }
}

function updateCompletionFromPath(currentPath, tasks) {
  if (!currentPath || !Array.isArray(tasks)) return;
  tasks.forEach((task) => {
    if (!task?.route) return;
    const isMatch =
      currentPath === task.route ||
      currentPath.startsWith(task.route + "/");
    if (isMatch && !task.completed) {
      task.completed = true;
    }
  });
  // no persistence per-route

  const allDone = tasks.every((t) => t.completed);
  if (allDone) {
    // persist both finished and completed (boolean)
    writeFlag(FINISHED_KEY, true);
    writeFlag(COMPLETED_KEY, true);
    isChecklistDismissed.value = true;
    markAllDone();
    setChecklistFinished();
  }
}

function loadChecklistState(currentPath, tasks) {
  // refresh dismissed state in case finished changed elsewhere
  isChecklistDismissed.value =
    readFlag(DISMISSED_KEY) || isFinished.value;
  applyCompletedToTasks(tasks);
  if (currentPath) updateCompletionFromPath(currentPath, tasks);
}

function hideChecklistCongrats() {
  congratsVisible.value = false;
}

export function useFirstUsageWizard() {
  return {
    // congrats (first usage)
    firstUsage,
    confetti,
    hasCompletedCongrats,
    completeCongrats,

    // tutorial checklist (persistence & flags)
    isFinished,
    isChecklistDismissed,
    congratsVisible,
    markAllDone,
    setChecklistFinished,
    dismissChecklist,

    // checklist helpers (task-agnostic)
    updateCompletionFromPath,
    loadChecklistState,
    hideChecklistCongrats,
  };
}
