import { ref } from "vue";

export function useVoucherItemModel(item) {
  const model = ref({
    debit: 0,
    credit: 0,
  });

  if (item) model.value = { ...item };

  return {
    model,
  };
}
