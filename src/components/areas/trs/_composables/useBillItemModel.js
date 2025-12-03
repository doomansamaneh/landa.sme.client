import { ref } from "vue";
import Decimal from "decimal.js";

export function useBillItemModel(item) {
  const model = ref({
    amount: 0,
    vatPercent: 0,
    vatAmount: 0,
    total: 0,
  });

  if (item) model.value = { ...item };

  const calculateTotal = (row) => {
    const amount = new Decimal(row.amount || 0);
    const vatPercent = new Decimal(row.vatPercent || 0);

    const vatAmount = amount
      .times(vatPercent)
      .div(100)
      .toDecimalPlaces(2, Decimal.ROUND_DOWN);

    const total = amount
      .plus(vatAmount)
      .toDecimalPlaces(2, Decimal.ROUND_DOWN);

    if (!new Decimal(row.vatAmount ?? 0).equals(vatAmount))
      row.vatAmount = vatAmount.toNumber();
    if (!new Decimal(row.total ?? 0).equals(total))
      row.total = total.toNumber();
  };

  return {
    model,
    calculateTotal,
  };
}
