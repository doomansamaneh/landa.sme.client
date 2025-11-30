import { ref } from "vue";
import Decimal from "decimal.js";

export function useBillItemModel(item) {
  const model = ref({
    amount: 0,
    vatPercent: 0,
    total: 0,
  });

  if (item) model.value = { ...item };

  const calculateTotal = (row) => {
    const amount = new Decimal(row.amount || 0); // تبدیل به Decimal
    const vatPercent = new Decimal(row.vatPercent || 0); // تبدیل به Decimal

    // محاسبه vatAmount با گرد کردن از پایین
    row.vatAmount = amount
      .times(vatPercent)
      .div(100)
      .toDecimalPlaces(2, Decimal.ROUND_DOWN);

    // محاسبه total با گرد کردن از پایین
    row.total = amount
      .plus(row.vatAmount)
      .toDecimalPlaces(2, Decimal.ROUND_DOWN);
  };

  return {
    model,
    calculateTotal,
  };
}
