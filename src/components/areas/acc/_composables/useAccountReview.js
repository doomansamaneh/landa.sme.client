import { ref } from "vue";
import { helper } from "src/helpers";

export function useAccountReview() {
  const state = ref([]);

  const setItem = ({ type, id, title }) => {
    const index = helper.findIndex(state.value, "type", type);
    if (index !== -1) {
      state.value[index] = { type, id, title };
    } else {
      state.value.push({ type, id, title });
    }
  };

  const removeItem = ({ type }) => {
    const index = helper.findIndex(state.value, "type", type);
    if (index !== -1) {
      state.value.splice(index, 1);
    }
  };

  return {
    state,
    setItem,
    removeItem,
  };
}
