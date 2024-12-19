import { ref, computed } from "vue";

export function useAccountReview() {
  const state = ref({
    CL: { id: null, title: null },
    GL: { id: null, title: null },
    SL: { id: null, title: null },
    DL: { id: null, title: null },
  });

  const setSelected = (type, id, title) => {
    if (state.value[type]) {
      state.value[type].id = id;
      state.value[type].title = title;
    }
  };

  const removeItem = () => {};

  const filteredItems = computed(() => {
    return Object.values(state.value)
      .filter((item) => item.id)
      .map((item) => item.title);
  });

  return {
    state,
    setSelected,
    filteredItems,
    removeItem,
  };
}
