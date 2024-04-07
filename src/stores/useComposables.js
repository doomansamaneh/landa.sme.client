import { ref } from "vue";

const composables = ref([]);

export function useComposables() {
  const registerComposable = (composable) => {
    composables.value.push(composable);
  };

  const resetAllComposables = () => {
    composables.value.forEach((c) => c.reset());
  };

  const unregisterComposable = (composable) => {
    composables.value = composables.value.filter((c) => c !== composable);
  };

  return {
    registerComposable,
    resetAllComposables,
    unregisterComposable,
  };
}
