import { ref } from "vue";

const FINISHED_KEY = "tutorial_checklist_finished";

const isFinished = ref(localStorage.getItem(FINISHED_KEY) === "1");
const congratsVisible = ref(false);

export function useTutorialChecklist() {
  function markAllDone() {
    if (!isFinished.value) {
      congratsVisible.value = true;
    }
  }

  function closeCongrats() {
    congratsVisible.value = false;
  }

  return {
    isFinished,
    congratsVisible,

    markAllDone,
    closeCongrats,
  };
}
