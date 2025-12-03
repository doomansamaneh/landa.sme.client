import { ref } from "vue";
import Decimal from "decimal.js";

export function useInvoiceItemModel(item) {
  const model = ref({
    quantity: 1,
    price: 0,
    discount: 0,
    discountPercent: 0,
    vatPercent: 0,
    vatAmount: 0,
    totalPrice: 0,
  });

  if (item) model.value = { ...item };

  const calculateTotal = (row) => {
    const quantity = new Decimal(row.quantity ?? 0);
    const price = new Decimal(row.price ?? 0);
    const discount = new Decimal(row.discount ?? 0);
    const vatPercent = new Decimal(row.vatPercent ?? 0);

    // محاسبه subtotal بدون VAT
    const subtotal = quantity.times(price).minus(discount);

    // محاسبه VAT
    const vatAmount = subtotal
      .times(vatPercent)
      .div(100)
      .toDecimalPlaces(0, Decimal.ROUND_DOWN);

    // محاسبه totalPrice شامل VAT
    const totalPrice = subtotal.plus(vatAmount);

    // اعمال به row فقط در صورت تغییر
    if (!new Decimal(row.vatAmount ?? 0).equals(vatAmount))
      row.vatAmount = vatAmount.toNumber();
    if (!new Decimal(row.totalPrice ?? 0).equals(totalPrice))
      row.totalPrice = totalPrice.toNumber();
  };

  return {
    model,
    calculateTotal,
  };
}
