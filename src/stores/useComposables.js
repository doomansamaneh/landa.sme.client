import { ref } from "vue";

const composables = ref([]);

export function useComposables() {
  const register = (composable) => {
    if (!composables.value.includes(composable))
      composables.value.push(composable);
  };

  const reset = () => {
    composables.value.forEach((c) => c.reset());
  };

  const unregister = (composable) => {
    composables.value = composables.value.filter(
      (c) => c !== composable
    );
  };

  return {
    register,
    reset,
    unregister,
  };
}
