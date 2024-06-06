import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { helper } from "src/helpers";
import { useReceiptItemModel } from "./useReceiptItemModel";
import { receiptModel } from "src/models/areas/trs/receiptModel";
import { useReceiptState } from "./useReceiptState";

export function useReceiptModel({ baseRoute, preview }) {
  const router = useRouter();
  const stateStore = useReceiptState();
  const itemStore = useReceiptItemModel();

  const model = ref(receiptModel);

  const crudStore = useFormActions(baseRoute, model);

  async function getById(id, action) {
    let responseData = null;
    if (id) {
      if (preview) responseData = await crudStore.getPreviewById(id);
      else if (action === "createFromInvoice")
        responseData = await crudStore.getById(
          id,
          "trs/receipt/createFromInvoice"
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
    model.value.paymentItems.push({
      ...itemStore.model.value,
      amount: Math.max(amount, 0),
      typeId: paymentMehod.value.id,
      color: paymentMehod.value.color,
      header: paymentMehod.label,
    });
  };

  const deleteRow = (index) => {
    model.value.paymentItems.splice(index, 1);
  };

  const editRow = (index, item) => {
    const row = model.value.paymentItems[index];
    Object.assign(row, item);
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

  return {
    model,
    crudStore,
    totalAmount,

    getById,
    addRow,
    editRow,
    deleteRow,
    submitForm,
  };
}
