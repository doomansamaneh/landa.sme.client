import { ref } from "vue";
import { helper, bus } from "src/helpers";

export function useProductStockReview() {
  const state = ref([]);

  const applySearch = async () => {
    bus.emit("apply-selected-account");
  };

  const setItem = async ({ type, id, title }) => {
    const index = helper.findIndex(state.value, "type", type);
    if (index !== -1) {
      state.value[index] = { type, id, title };
    } else {
      state.value.push({ type, id, title });
    }
    await applySearch();
  };

  const removeItem = async ({ type }) => {
    const index = helper.findIndex(state.value, "type", type);
    if (index !== -1) {
      state.value.splice(index, 1);
      await applySearch();
    }
  };

  const getItemByType = (type) => {
    return state.value.find((item) => item.type === type) || null;
  };

  return {
    state,
    setItem,
    removeItem,
    getItemByType,
  };
}
