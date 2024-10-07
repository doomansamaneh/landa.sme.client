import { ref } from "vue";

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
    console.log(row);
    const total =
      (row.quantity ?? 0) * (row.price ?? 0) - (row.discount ?? 0);
    const vatAmount = (total * row.vatPercent) / 100;
    const totalPrice = total + row.vatAmount;

    if (row.vatAmount !== vatAmount) row.vatAmount = vatAmount;
    if (row.totalPrice !== totalPrice) row.totalPrice = totalPrice;
  };

  return {
    model,
    calculateTotal,
  };
}
