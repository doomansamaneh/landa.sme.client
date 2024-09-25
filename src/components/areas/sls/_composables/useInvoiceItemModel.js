import { ref, nextTick } from "vue";

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
    const vatAmount = (total * row.vatPercent) / 100;
    const totalPrice = total + row.vatAmount;

    // if (row.vatAmount !== vatAmount) row.vatAmount = vatAmount;
    // if (row.totalPrice !== totalPrice) row.totalPrice = totalPrice;

    // Batch updates together
    nextTick(() => {
      if (row.vatAmount !== vatAmount) {
        row.vatAmount = vatAmount;
      }

      if (row.totalPrice !== totalPrice) {
        row.totalPrice = totalPrice;
      }
    });

    // if (row.vatAmount !== vatAmount || row.totalPrice !== totalPrice)
    //   Object.assign(row, {
    //     vatAmount: vatAmount,
    //     totalPrice: totalPrice,
    //   });
  };

  return {
    model,
    calculateTotal,
  };
}
