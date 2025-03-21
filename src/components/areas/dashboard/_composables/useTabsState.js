import { ref, computed } from "vue";

const tab = ref("general");
const shakingStates = ref({
  general: false,
  sales: false,
  expense: false,
});

export function useTabsState() {
  // Create a computed property that safely handles tab value
  const isShaking = computed(() => {
    const currentTab = tab.value;
    return currentTab
      ? shakingStates.value[currentTab] || false
      : false;
  });

  // Function to check if a specific tab is shaking
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
