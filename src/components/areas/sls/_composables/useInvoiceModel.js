import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useFormActions } from "src/composables/useFormActions";
import { fetchWrapper, helper } from "src/helpers";
import { useInvoiceItemModel } from "./useInvoiceItemModel";
import { invoiceModel } from "src/models/areas/sls/invoiceModel";

import ResponseDialog from "src/components/areas/sls/invoice/shared/forms/ResponseDialog.vue";

export function useInvoiceModel(preview) {
  const $q = useQuasar();
  const router = useRouter();
  const itemStore = useInvoiceItemModel();

  const model = ref(invoiceModel);

  const crudStore = useFormActions("sls/invoice", model);

  async function getById(id) {
    let responseData = null;
    if (id) {
      if (preview) responseData = await crudStore.getPreviewById(id);
      else responseData = await crudStore.getById(id);
    } else responseData = await crudStore.getCreateModel();
    if (responseData) addWatch();
  }

  // onMounted(() => {
  //   getById(route.params.id);
  // });

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

  const addNewRowByCode = async (code) => {
    if (code) {
      const response = await fetchWrapper.get(`cmn/product/getByCode/${code}`);
      const product = response.data.data;
      if (product) {
        const currentItem = model.value.invoiceItems.find(
          (r) => r.productId === product.id
        );
        if (currentItem) currentItem.quantity += 1;
        else
          pushNewRow({
            productId: product.id,
            productCode: product.code,
            productTitle: `${product.code} ${product.title}`,
            productUnitId: product.productUnitId,
            productUnitTitle: product.productUnitTitle,
            price: product.price,
            vatPercent: 0,
            vatAmounnt: 0,
            discount: 0,
            quantity: 1,
          });
      }
    }
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
    await crudStore.submitForm(form, action, saveCallBack);
    function saveCallBack(responseData) {
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
    }
  }

  return {
    model,
    crudStore,
    totalPrice,
    totalDiscount,
    totalVat,
    totalNetPrice,

    getById,
    addNewRow,
    addNewRowByCode,
    pushNewRow,
    editRow,
    deleteRow,
    applyDiscountAmount,
    applyDiscountPercent,
    submitForm,
  };
}
