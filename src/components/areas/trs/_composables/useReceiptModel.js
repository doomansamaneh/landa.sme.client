import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { helper } from "src/helpers";
import { useReceiptItemModel } from "./useReceiptItemModel";
import { useFormItemsModel } from "src/composables/useFormItemsModel";
import { receiptModel } from "src/models/areas/trs/receiptModel";

export function useReceiptModel({ baseRoute, preview }) {
  const router = useRouter();
  const itemStore = useReceiptItemModel();

  const model = ref(receiptModel);
  const isAddingItem = ref(false);
  const validationErrors = ref({});

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

  const addRow = async (paymentMehod) => {
    try {
      isAddingItem.value = true;
      const amount = model.value.remainedAmount - totalAmount.value;
      const item = {
        ...itemStore.model.value,
        amount: Math.max(amount, 0),
        typeId: paymentMehod.value.id,
      };

      // Only validate typeId when adding a new item
      const errors = validateNewItem(item);
      if (Object.keys(errors).length > 0) {
        validationErrors.value = errors;
        console.error("Validation errors:", errors);
        return;
      }

      formItemStore.pushNewItem(model.value.paymentItems, item);
      validationErrors.value = {};
    } catch (error) {
      console.error("Error adding row:", error);
      validationErrors.value = {
        general: "Failed to add item. Please try again.",
      };
    } finally {
      isAddingItem.value = false;
    }
  };

  const validateNewItem = (item) => {
    const errors = {};
    if (!item.typeId) {
      errors.typeId = "Payment type is required";
    }
    return errors;
  };

  const validateItem = (item) => {
    const errors = {};
    if (!item.amount || item.amount <= 0) {
      errors.amount = "Amount must be greater than 0";
    }
    if (!item.typeId) {
      errors.typeId = "Payment type is required";
    }
    return errors;
  };

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
    isAddingItem,
    validationErrors,

    getById,
    addRow,
    editRow,
    deleteRow,
    resetSL,
    resetRemainedInvoices,
    submitForm,
  };
}
