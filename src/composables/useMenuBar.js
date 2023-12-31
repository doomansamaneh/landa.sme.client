import { ref } from "vue"

const state = ref(true)

export function useMenuBar() {
  const toggle = () => {
    state.value = !state.value
  }

  return {
    state,
    toggle,
  }
}
