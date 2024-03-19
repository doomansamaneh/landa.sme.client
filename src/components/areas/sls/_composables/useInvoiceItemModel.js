import { ref, watchEffect } from "vue";

export function useInvoiceItemModel(item) {
  const model = ref({
    quantity: 1,
    price: 0,
    discount: 0,
    vatPercent: 0,
    vatAmount: 0,
    totalPrice: 0,
  });

  if (item) model.value = { ...item };

  const calculateTotal = (row) => {
    const total = row.quantity * row.price - row.discount;
    row.vatAmount = (total * row.vatPercent) / 100;
    row.totalPrice = total + row.vatAmount;
  };

  watchEffect(() => {
    calculateTotal(model.value);
  });

  return {
    model,
    calculateTotal,
  };
}
