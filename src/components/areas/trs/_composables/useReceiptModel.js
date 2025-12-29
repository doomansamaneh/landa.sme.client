import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { helper } from "src/helpers";
import { useFormItemsModel } from "src/composables/useFormItemsModel";
import { receiptModel } from "src/models/areas/trs/receiptModel";

export function useReceiptModel({ baseRoute, preview }) {
  const router = useRouter();
  const route = useRoute();

  const model = ref(receiptModel);
  const isAddingItem = ref(false);
  const validationErrors = ref({});
  const invoiceId = ref(null);
  const returnRoute = ref(null);

  const crudStore = useFormActions(baseRoute, model);
  const formItemStore = useFormItemsModel();

  async function getById(id, action) {
    let responseData = null;
    if (id) {
      if (preview) responseData = await crudStore.getPreviewById(id);
      else if (action === "createFromInvoice") {
        invoiceId.value = id;
        returnRoute.value = route.query.returnRoute || null;
        responseData = await crudStore.getById(
          id,
          `${baseRoute}/createFromInvoice`
        );
      } else responseData = await crudStore.getById(id);
    } else responseData = await crudStore.getCreateModel(setItems);

    setItems();

    if (responseData) {
      if (action === "copy") {
        model.value.no = 0;
        model.value.fiscalYearId = null;
      }
    }
  }

  function setItems() {
    if (!model.value.paymentItems) {
      model.value.paymentItems = [];
      model.value.remainedInvoices = [];
    }
  }

  const addRow = async (item) => {
    formItemStore.pushNewItem(model.value.paymentItems, item);
  };

  const remainedAmount = computed(() => {
    return model.value.remainedAmount - totalAmount.value;
  });

  const deleteRow = async (index) => {
    try {
      isAddingItem.value = true;
      formItemStore.deleteItem(model.value.paymentItems, index);
    } finally {
      isAddingItem.value = false;
    }
  };

  const editRow = (index, item) => {
    formItemStore.deleteItem(model.value.paymentItems, item);
  };

  const totalAmount = computed(() =>
    helper.getSubtotal(model.value.paymentItems, "amount")
  );

  async function submitForm(form, action) {
    await crudStore.submitForm(form, action, saveCallBack);
    function saveCallBack(responseData) {
      if (invoiceId.value && returnRoute.value) {
        router.push(`/${returnRoute.value}`);
      } else {
        router.back();
      }
    }
  }

  function resetSL() {
    model.value.slId = null;
    model.value.slTitle = null;
  }

  function resetRemainedInvoices() {
    model.value.remainedInvoices = [];
  }

  return {
    model,
    crudStore,
    totalAmount,
    newAddedItemIndex: formItemStore.newAddedItemIndex,
    isAddingItem,
    validationErrors,
    remainedAmount,

    getById,
    addRow,
    editRow,
    deleteRow,
    resetSL,
    resetRemainedInvoices,
    submitForm,
  };
}
