import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useFormActions } from "src/composables/useFormActions";
import { useFormItemsModel } from "src/composables/useFormItemsModel";
import { fetchWrapper, helper } from "src/helpers";
import { useInvoiceItemModel } from "./useInvoiceItemModel";
import { invoiceModel } from "src/models/areas/sls/invoiceModel";

import ConfirmDialog from "src/components/shared/ConfirmDialog.vue";
import ResponseDialog from "src/components/areas/sls/invoice/shared/forms/ResponseDialog.vue";

export function useInvoiceModel(config) {
  const $q = useQuasar();
  const router = useRouter();
  const { t } = useI18n();
  const itemStore = useInvoiceItemModel();
  const formItemStore = useFormItemsModel();

  const model = config?.model ?? ref(invoiceModel);

  const crudStore = useFormActions(config.baseRoute, model);

  async function getById(id, action) {
    let responseData = null;
    const date = model.value.date;
    if (id) {
      if (config.preview) responseData = await crudStore.getPreviewById(id);
      else if (["createFromInvoice", "createFromQuote"].includes(action)) 
        responseData = await crudStore.getById(id, `${config.baseRoute}/${action}`);
      else responseData = await crudStore.getById(id);
    } else
      responseData = await crudStore.getCreateModel(setInvoiceItems);

    if (responseData) {
      if (action === "copy") {
        model.value.quoteId = null;
        model.value.fiscalYearId = null;
        model.value.date = date;
      }
    }

    setInvoiceItems();
    addWatch();
  }

  function setInvoiceItems() {
    if (!model.value.originalDocument)
      model.value.originalDocument = {};
    if (!model.value.invoiceItems) model.value.invoiceItems = [];
  }

  async function reorder(callBack) {
    await crudStore.customPostAction("reorder", model.value);
    if (callBack) callBack();
  }

  async function cancelInvoice(id, callBack) {
    if (id) {
      $q.dialog({
        component: ConfirmDialog,
        componentProps: {
          title: t("shared.labels.cancelInvoice"),
          message: `${t("shared.labels.cancelInvoiceMessage")}.`,
          ok: t("shared.labels.cancelInvoice"),
          okColor: "deep-orange-7",
        },
      }).onOk(async () => {
        const response = await fetchWrapper.post(
          `${config.baseRoute}/cancelInvoice/${id}`
        );
        notifyResponse(response.data);
        if (callBack) callBack();
      });
    } else notify("no row selected", "negative");
  }

  async function cancelInvoices(idList, callBack) {
    if (crudStore.validateIdList(idList)) {
      $q.dialog({
        component: ConfirmDialog,
        componentProps: {
          title: t("shared.labels.cancelInvoice"),
          message: `${t("shared.labels.cancelInvoiceMessage")}. ${t(
            "shared.labels.selectedRows"
          )}: ${idList.length}`,
          ok: t("shared.labels.cancelInvoice"),
          okColor: "deep-orange-7",
        },
      }).onOk(async () => {
        const response = await fetchWrapper.post(
          `${config.baseRoute}/cancelInvoice`,
          idList
        );
        notifyResponse(response.data);
        if (callBack) callBack();
      });
    } else notify("no row selected", "negative");
  }

  async function reorder(callBack) {
    await crudStore.customPostAction("reorder", model.value);
    if (callBack) callBack();
  }

  function notifyResponse(data) {
    notify(data.message);
  }

  function notify(message, type = "positive") {
    $q.notify({
      type: type,
      message: message,
    });
  }

  function addWatch() {
    if (!model.value.invoiceItems) return;
    // watch(
    //   model.value.invoiceItems,
    //   async (newItems) => {
    //     newItems.forEach((item) => {
    //       console.log(item);
    //       itemStore.calculateTotal(item);
    //     });
    //     watching = false;
    //   },
    //   { deep: true }
    // );

    watch(
      () =>
        model.value.invoiceItems.map((item) => [
          item.quantity,
          item.price,
          item.discount,
          item.discountPercent,
          item.vatPercent,
        ]),
      (newItems) => {
        newItems.forEach((item, index) => {
          itemStore.calculateTotal(model.value.invoiceItems[index]);
        });
      }
    );
  }

  addWatch();

  const applyDiscountAmount = (discount) => {
    const total = Math.max(
      totalPrice.value + totalDiscount.value - totalVat.value,
      1
    );
    let subTotal = 0;
    let lastItem = null;
    model.value.invoiceItems.forEach((item) => {
      lastItem = item;
      const itemDiscount = Math.floor(
        (discount * item.quantity * item.price) / total
      );
      if (item.discount !== itemDiscount)
        item.discount = itemDiscount;
      subTotal += itemDiscount;
    });

    if (discount != subTotal) {
      lastItem.discount += discount - subTotal;
    }
  };

  const applyDiscountPercent = (percent) => {
    model.value.invoiceItems.forEach((item) => {
      item.discountPercent = percent;
      item.discount = (item.quantity * item.price * percent) / 100;
    });
  };

  const applyVat = (vat) => {
    if (vat) {
      model.value.invoiceItems.forEach((item) => {
        if (item.vatId !== vat.id) {
          item.vatId = vat.id;
          item.vatTitle = vat.title;
          item.vatPercent = vat.rate;
        }
      });
    }
  };

  const addNewRow = (index, currentRow) => {
    const newRow = { ...itemStore.model.value };
    newRow.vatId = currentRow.vatId;
    newRow.vatTitle = currentRow.vatTitle;
    newRow.vatPercent = currentRow.vatPercent;
    formItemStore.addNewItem(model.value.invoiceItems, index, newRow);
  };

  const pushNewRow = (item) => {
    const newRow = item ?? { ...itemStore.model.value };
    if (!newRow.vatId) {
      newRow.vatId = model.value.defaultItem?.vatId;
      newRow.vatTitle = model.value.defaultItem?.vatTitle;
      newRow.vatPercent = model.value.defaultItem?.vatPercent ?? 0;
    }

    formItemStore.pushNewItem(model.value.invoiceItems, newRow);
  };

  const addNewRowByCode = async (code) => {
    if (code) {
      const response = await fetchWrapper.get(
        `cmn/product/getByCode/${code}`
      );
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
            productTitle: product.title,
            productUnitId: product.productUnitId,
            productUnitTitle: product.productUnitTitle,
            productCodeTitle: `${product.code} - ${product.title}`,
            price:
              product.price <= 0 ? product.maxPrice : product.price,
            discount: 0,
            quantity: 1,
          });
      }
    }
  };

  const addProduct = (product) => {
    const selectedRows = model.value.invoiceItems.find(
      (r) => r.productId === product.id
    );
    if (selectedRows) {
      selectedRows.quantity += 1;
    } else {
      const newRow = { ...itemStore.model.value };
      newRow.productId = product.id;
      newRow.productCode = product.code;
      newRow.productTitle = product.title;
      newRow.productCodeTitle = `${product.code} - ${product.title}`;
      newRow.productUnitId = product.productUnitId;
      newRow.productUnitTitle = product.productUnitTitle;
      newRow.price =
        product.price <= 0 ? product.maxPrice ?? 0 : product.price;
      newRow.quantity = 1;
      pushNewRow(newRow);
    }
  };

  const removeProduct = (product) => {
    const selectedRows = model.value.invoiceItems.find(
      (r) => r.productId === product.id
    );
    const index = model.value.invoiceItems.indexOf(selectedRows);
    deleteRow(index);
  };

  const getProductQuantity = (productId) => {
    const selectedRows = model.value.invoiceItems.find(
      (r) => r.productId === productId
    );
    if (selectedRows) return selectedRows.quantity;
    return 0;
  };

  const deleteRow = (index) => {
    formItemStore.deleteItem(model.value.invoiceItems, index);
  };

  const editRow = (index, item) => {
    formItemStore.editItem(model.value.invoiceItems, index, item);
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

  async function submitForm(form, action, callBack) {
    if (model.value.cashId) {
      model.value.paymentItems = [
        {
          cashId: model.value.cashId,
          amount: totalPrice.value,
        },
      ];
    }
    await crudStore.submitForm(form, action, saveCallBack);

    function saveCallBack(responseData) {
      if (responseData?.code === 200 && config?.resetCallback)
        config.resetCallback();

      if (callBack) callBack(responseData);
      else if (responseData?.code === 200) {
        $q.dialog({
          component: ResponseDialog,
          componentProps: {
            responseData: responseData.data,
            baseRoute: config.baseRoute,
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
    newAddedItemIndex: formItemStore.newAddedItemIndex,

    getById,
    reorder,
    addNewRow,
    addNewRowByCode,
    pushNewRow,
    editRow,
    deleteRow,
    applyDiscountAmount,
    applyDiscountPercent,
    applyVat,
    cancelInvoice,
    cancelInvoices,
    submitForm,

    addProduct,
    removeProduct,
    getProductQuantity,
  };
}
