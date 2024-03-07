import { ref, computed, watch } from "vue";
import { useFormActions } from "src/composables/useFormActions";
import { helper } from "src/helpers";
import "src/helpers/extensions";

export function useInvoiceModel() {
  const dateTime = new Date();

  const defaultItem = {
    quantity: 1,
    price: 0,
    discount: 0,
    vatPercent: 0,
    vatAmount: 0,
    totalPrice: 0,
  };

  const model = ref({
    no: 1,
    date: dateTime.toDateString(),
    invoiceItems: [{ ...defaultItem }],
  });

  const editBatchModel = ref({
    productGroup: {
      fieldName: "ProductGroupId",
      isModified: false,
    },
    taxCode: {
      fieldName: "TaxCode",
      isModified: false,
    },
    productType: {
      fieldName: "TypeId",
      isModified: false,
    },
    productUnit: {
      fieldName: "ProductUnitId",
      isModified: false,
    },
    isForPurchase: {
      fieldName: "IsForPurchase",
      fieldValue: "0",
      isModified: false,
    },
    isForSale: {
      fieldName: "IsForSale",
      fieldValue: "0",
      isModified: false,
    },
    isActive: {
      fieldName: "IsActive",
      fieldValue: "0",
      isModified: false,
    },
  });

  const crudStore = useFormActions("sls/invoice", model);

  watch(model.value.invoiceItems, async () => {
    model.value.invoiceItems.forEach((item) => {
      const total = item.quantity * item.price;
      item.totalPrice = total;
      item.vatAmount = (total * item.vatPercent) / 100;
      item.totalAmount = total + item.vatAmount - item.discount;
    });
  });

  const applyDiscountAmount = (discount) => {
    const total = Math.max(totalPrice.value, 1);
    model.value.invoiceItems.forEach((item) => {
      item.discount = Math.round((discount * item.totalPrice) / total);
    });
  };

  const applyDiscountPercent = (percent) => {
    model.value.invoiceItems.forEach((item) => {
      item.discountPercent = percent;
      item.discount = (item.totalPrice * percent) / 100;
    });
  };

  const addNewRow = (index, row) => {
    const newRow = { ...defaultItem };
    newRow.vatId = row.vatId;
    newRow.vatTitle = row.vatTitle;
    newRow.vatPercent = row.vatPercent;
    model.value.invoiceItems.splice(index + 1, 0, newRow);
  };

  const deleteRow = (index) => {
    if (model.value.invoiceItems.length > 1)
      model.value.invoiceItems.splice(index, 1);
    else model.value.invoiceItems[0] = { ...defaultItem };
  };

  const totalPrice = computed(() =>
    helper.getSubtotal(model.value.invoiceItems, "totalPrice")
  );
  const totalDiscount = computed(() =>
    helper.getSubtotal(model.value.invoiceItems, "discount")
  );
  const totalVat = computed(() =>
    helper.getSubtotal(model.value.invoiceItems, "vatAmount")
  );
  const totalAmount = computed(
    () => totalPrice.value + totalVat.value - totalDiscount.value
  );

  return {
    model,
    editBatchModel,
    crudStore,
    totalPrice,
    totalDiscount,
    totalVat,
    totalAmount,

    addNewRow,
    deleteRow,
    applyDiscountAmount,
    applyDiscountPercent,
  };
}
