import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { helper } from "src/helpers";
import { useReceiptItemModel } from "./useReceiptItemModel";
import { useFormItemsModel } from "src/composables/useFormItemsModel";
import { receiptModel } from "src/models/areas/trs/receiptModel";
import { useReceiptState } from "./useReceiptState";

export function useReceiptModel({ baseRoute, preview }) {
  const router = useRouter();
  const stateStore = useReceiptState();
  const itemStore = useReceiptItemModel();

  const model = ref(receiptModel);

  const crudStore = useFormActions(baseRoute, model);
  const formItemStore = useFormItemsModel();

  async function getById(id, action) {
    let responseData = null;
    if (id) {
      if (preview) responseData = await crudStore.getPreviewById(id);
      else if (action === "createFromInvoice")
        responseData = await crudStore.getById(
          id,
          `${baseRoute}/createFromInvoice`
        );
      else responseData = await crudStore.getById(id);
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

  const addRow = (paymentMehod) => {
    const amount = model.value.remainedAmount - totalAmount.value;
    const item = {
      ...itemStore.model.value,
      amount: Math.max(amount, 0),
      typeId: paymentMehod.value.id,
    };
    formItemStore.pushNewItem(model.value.paymentItems, item);
  };

  const deleteRow = (index) => {
    formItemStore.deleteItem(model.value.paymentItems, index);
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
      stateStore.state.firstLoad.value = false;
      router.back();
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

    getById,
    addRow,
    editRow,
    deleteRow,
    resetSL,
    resetRemainedInvoices,
    submitForm,
  };
}
