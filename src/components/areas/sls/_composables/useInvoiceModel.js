import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { helper } from "src/helpers";
import "src/helpers/extensions";
import { useQuasar } from "quasar";
import ResponseDialog from "src/components/areas/sls/invoice/shared/forms/ResponseDialog.vue";

export function useInvoiceModel() {
  const dateTime = new Date();
  const $q = useQuasar();
  const router = useRouter();

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

  async function getById(id) {
    var responseData = await crudStore.getById(id);
    if (responseData) addWatch();
  }

  function addWatch() {
    watch(
      model.value.invoiceItems,
      async () => {
        model.value.invoiceItems.forEach((item) => {
          const total = item.quantity * item.price - item.discount;
          item.vatAmount = (total * item.vatPercent) / 100;
          item.totalPrice = total + item.vatAmount;
        });
      },
      { deep: true }
    );
  }

  addWatch();

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

  const addNewRow = (index, currentRow) => {
    const newRow = { ...defaultItem };
    newRow.vatId = currentRow.vatId;
    newRow.vatTitle = currentRow.vatTitle;
    newRow.vatPercent = currentRow.vatPercent;
    model.value.invoiceItems.splice(index + 1, 0, newRow);
  };

  const pushNewRow = (item) => {
    model.value.invoiceItems.push(item);
  };

  const deleteRow = (index) => {
    if (model.value.invoiceItems.length > 1)
      model.value.invoiceItems.splice(index, 1);
    else model.value.invoiceItems[0] = { ...defaultItem };
  };

  const editRow = (index, item) => {
    const row = model.value.invoiceItems[index];
    Object.assign(row, item);
  };

  const removeRow = (index) => {
    model.value.invoiceItems.splice(index, 1);
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
  const totalNetPrice = computed(
    () => totalPrice.value + totalDiscount.value - totalVat.value
  );

  async function submitForm(form, action) {
    await form.value.validate().then(async (success) => {
      if (success) {
        const responseData = await crudStore.createOrEdit(action);
        if (responseData?.code === 200) {
          $q.dialog({
            component: ResponseDialog,
            componentProps: {
              responseData: responseData.data,
              //title: t("shared.labels.deleteConfirm"),
              //message: `${t("shared.labels.deleteMessage")}.`,
              // ok: t("shared.labels.delete"),
              // okColor: "deep-orange-7",
            },
          }).onOk(async () => {
            router.back();
          });
        }
      } else {
        //todo: how to show validation message to user
        alert("validation error");
      }
    });
  }

  return {
    model,
    defaultItem,
    editBatchModel,
    crudStore,
    totalPrice,
    totalDiscount,
    totalVat,
    totalNetPrice,

    getById,
    addNewRow,
    pushNewRow,
    editRow,
    deleteRow,
    removeRow,
    applyDiscountAmount,
    applyDiscountPercent,
    submitForm,
  };
}
