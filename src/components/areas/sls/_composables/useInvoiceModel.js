import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import { useFormActions } from "src/composables/useFormActions";
import { useFormItemsModel } from "src/composables/useFormItemsModel";
import { fetchWrapper, helper } from "src/helpers";
import { useInvoiceItemModel } from "./useInvoiceItemModel";
import { invoiceModel } from "src/models/areas/sls/invoiceModel";
import { invoiceFormType } from "src/constants";

import ConfirmDialog from "src/components/shared/ConfirmDialog.vue";
import ResponseDialog from "src/components/areas/sls/invoice/shared/forms/ResponseDialog.vue";

export function useInvoiceModel(config) {
  const $q = useQuasar();
  const { t } = useI18n();
  const router = useRouter();
  const itemStore = useInvoiceItemModel();
  const formItemStore = useFormItemsModel();

  const model = config?.model ?? ref(invoiceModel);
  const discountTypes = ref({});

  const crudStore = useFormActions(config.baseRoute, model);

  async function getById(id, action) {
    if (id) {
      if (config.preview) await crudStore.getPreviewById(id);
      else if (action)
        await crudStore.getById(id, `${config.baseRoute}/${action}`);
      else await crudStore.getById(id);
    } else await getCreateModel();

    setInvoiceItems();
    addWatch();
  }

  async function getCreateModel() {
    await crudStore.getCreateModel(setInvoiceItems);
    // setInvoiceItems();
    // addWatch();
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
          title: "shared.labels.cancelInvoice",
          message: "shared.labels.cancelInvoiceMessage",
          ok: "shared.labels.cancelInvoice",
          okColor: "deep-orange-7",
        },
      }).onOk(async () => {
        await crudStore.customPostAction(`cancelInvoice/${id}`);
        if (callBack) callBack();
      });
    } else notify("noRowSelected", "negative");
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
        await crudStore.customPostAction(`cancelInvoice`, idList);
        if (callBack) callBack();
      });
    } else notify("noRowSelected", "negative");
  }

  async function reorder(callBack) {
    await crudStore.customPostAction("reorder", model.value);
    if (callBack) callBack();
  }

  function notify(message, type = "positive") {
    $q.notify({
      type: type,
      message: t(`messages.${message}`),
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
    // Calculate total without current discount
    const total = Math.max(totalPrice.value - totalVat.value, 1);
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
      item.discount = Math.floor(
        (item.quantity * item.price * percent) / 100
      );
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

  const addProduct = (product, formType = invoiceFormType.sales) => {
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
      if (
        formType === invoiceFormType.sales ||
        formType === invoiceFormType.purchaseReturn
      )
        newRow.price =
          product.price <= 0 ? product.maxPrice ?? 0 : product.price;
      else
        newRow.price =
          product.purchasePrice <= 0
            ? product.maxPrice ?? 0
            : product.purchasePrice;
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

  // --- Discount Type Logic ---

  function getDiscountType(index) {
    if (discountTypes.value[index] === undefined) {
      const item = model.value.invoiceItems[index];
      if (item.discountPercent > 0) {
        discountTypes.value[index] = true;
        item.discountValue = item.discountPercent;
      } else if (item.discount > 0) {
        discountTypes.value[index] = false;
        item.discountValue = item.discount;
      } else {
        discountTypes.value[index] = false;
      }
    }
    return discountTypes.value[index];
  }

  function toggleRowDiscountType(index) {
    const item = model.value.invoiceItems[index];
    discountTypes.value[index] = !getDiscountType(index);
    // صفر کردن مقدار تخفیف
    item.discountValue = 0;
    item.discount = 0;
    item.discountPercent = 0;
  }

  function setDiscountValue(index, value) {
    const item = model.value.invoiceItems[index];
    if (getDiscountType(index)) {
      item.discountPercent = value;
      item.discount = Math.floor(
        (item.quantity * item.price * value) / 100
      );
    } else {
      item.discountPercent = 0;
      item.discount = value;
      // item.discountPercent =
      //   value > 0 && item.quantity * item.price > 0
      //     ? Math.floor((value * 100) / (item.quantity * item.price))
      //     : 0;
    }
    item.discountValue = value;
  }

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
      if (responseData?.code === 200) {
        if (config?.resetCallback) config.resetCallback();
      }

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
    getCreateModel,
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

    // --- Discount Type Logic ---
    discountTypes,
    getDiscountType,
    toggleRowDiscountType,
    setDiscountValue,
  };
}
