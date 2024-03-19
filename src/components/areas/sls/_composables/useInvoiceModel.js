import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { useQuasar } from "quasar";
import { helper } from "src/helpers";
import "src/helpers/extensions";
import { useInvoiceItemModel } from "./useInvoiceItemModel";

import ResponseDialog from "src/components/areas/sls/invoice/shared/forms/ResponseDialog.vue";

export function useInvoiceModel() {
  const dateTime = new Date();
  const $q = useQuasar();
  const router = useRouter();
  const route = useRoute();
  const itemStore = useInvoiceItemModel();

  const model = ref({
    no: 1,
    date: dateTime.toDateString(),
    invoiceItems: [],
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

  onMounted(() => {
    getById(route.params.id);
  });

  function addWatch() {
    watch(
      model.value.invoiceItems,
      async () => {
        model.value.invoiceItems.forEach((item) => {
          itemStore.calculateTotal(item);
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
    const newRow = { ...itemStore.model.value };
    newRow.vatId = currentRow.vatId;
    newRow.vatTitle = currentRow.vatTitle;
    newRow.vatPercent = currentRow.vatPercent;
    model.value.invoiceItems.splice(index + 1, 0, newRow);
  };

  const pushNewRow = (item) => {
    if (item) model.value.invoiceItems.push(item);
    else model.value.invoiceItems.push(itemStore.model.value);
  };

  const deleteRow = (index) => {
    model.value.invoiceItems.splice(index, 1);
    // if (model.value.invoiceItems.length > 1)
    //   model.value.invoiceItems.splice(index, 1);
    // else model.value.invoiceItems[0] = { ...itemStore.model.value };
  };

  const editRow = (index, item) => {
    const row = model.value.invoiceItems[index];
    Object.assign(row, item);
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
    editBatchModel,
    crudStore,
    totalPrice,
    totalDiscount,
    totalVat,
    totalNetPrice,

    addNewRow,
    pushNewRow,
    editRow,
    deleteRow,
    applyDiscountAmount,
    applyDiscountPercent,
    submitForm,
  };
}
