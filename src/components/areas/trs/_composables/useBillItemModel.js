import { ref } from "vue";

export function useBillItemModel(item) {
  const model = ref({
    amount: 0,
    fee: 0,
  });

  if (item) model.value = { ...item };

  return {
    model,
  };
}
