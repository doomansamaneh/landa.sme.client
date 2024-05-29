import { ref } from "vue";

const state = ref(false);

export function useContactDrawer() {
  const toggle = () => {
    state.value = !state.value;
  };

  return {
    state,
    toggle,
  };
}
