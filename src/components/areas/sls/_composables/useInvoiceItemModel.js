import { ref, watch } from "vue";

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

  function addWatch() {
    watch(
      model,
      async () => {
        const total =
          model.value.quantity * model.value.price - model.value.discount;
        model.value.vatAmount = (total * model.value.vatPercent) / 100;
        model.value.totalPrice = total + model.value.vatAmount;
      },
      { deep: true }
    );
  }

  addWatch();

  return {
    model,
  };
}
