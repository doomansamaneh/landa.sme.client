import { ref, computed } from "vue";

const tab = ref("general");
const shakingStates = ref({
  general: false,
  sales: false,
  expense: false,
  purchase: false,
});

export function useTabsState() {
  const isShaking = computed(() => {
    const currentTab = tab.value;
    return currentTab
      ? shakingStates.value[currentTab] || false
      : false;
  });

  const isTabShaking = (tabName) => {
    return shakingStates.value[tabName] || false;
  };

  return {
    tab,
    shakingStates,
    isShaking,
    isTabShaking,
  };
}
