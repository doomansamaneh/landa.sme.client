import { ref } from "vue";

export function useBillItemModel(item) {
  const model = ref({
    amount: 0,
    vatPercent: 0,
    total: 0,
  });

  if (item) model.value = { ...item };

  const calculateTotal = (row) => {
    const amount = row.amount;
    row.vatAmount = Math.floor((amount * row.vatPercent) / 100);
    row.total = amount + row.vatAmount;
  };

  return {
    model,
    calculateTotal,
  };
}
