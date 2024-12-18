import { ref } from "vue";

export function useAccountReview() {
  const state = ref({
    selectedCL: {
      id: null,
      title: null,
    },
    selectedGL: {
      id: null,
      title: null,
    },
    selectedDL: {
      id: null,
      title: null,
    },
    selectedSL: {
      id: null,
      title: null,
    },
  });

  const setSelectedCL = (id, title) => {
    state.value.selectedCL.id = id;
    state.value.selectedCL.title = title;
  };

  return {
    state,
    setSelectedCL,
  };
}
