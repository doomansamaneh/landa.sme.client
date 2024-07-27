import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { helper } from "src/helpers";
import { useBillItemModel } from "./useBillItemModel";
import { useFormItemsModel } from "src/composables/useFormItemsModel";
import { billModel } from "src/models/areas/trs/billModel";
import { useReceiptState } from "./useReceiptState";

export function useBillModel({ baseRoute, preview }) {
  const router = useRouter();
  const stateStore = useReceiptState();
  const itemStore = useBillItemModel();

  const model = ref(billModel);

  const crudStore = useFormActions(baseRoute, model);
  const formItemStore = useFormItemsModel();

  async function getById(id, action) {
    let responseData = null;
    if (id) {
      if (preview) responseData = await crudStore.getPreviewById(id);
      else responseData = await crudStore.getById(id);
    } else responseData = await crudStore.getCreateModel(setItems);

    if (responseData) {
      if (action === "copy") {
        model.value.no = 0;
        model.value.fiscalYearId = null;
      }
    }

    setItems();
    addWatch();
  }

  function setItems() {
    if (!model.value.paymentItems) model.value.paymentItems = [];
    if (!model.value.billItems) model.value.billItems = [];
  }

  function addWatch() {
    watch(
      model.value.billItems,
      async () => {
        model.value.billItems.forEach((item) => {
          itemStore.calculateTotal(item);
        });
      },
      { deep: true }
    );
  }

  addWatch();

  const addNewItem = (index, currentRow) => {
    const newRow = { ...itemStore.model.value };
    newRow.vatId = currentRow.vatId;
    newRow.vatTitle = currentRow.vatTitle;
    newRow.vatPercent = currentRow.vatPercent;
    formItemStore.addNewItem(model.value.billItems, index, newRow);
  };

  const pushNewItem = (item) => {
    const newRow = item ?? { ...itemStore.model.value };
    formItemStore.pushNewItem(model.value.billItems, newRow);
  };

  const deleteItem = (index) => {
    formItemStore.deleteItem(model.value.billItems, index);
  };

  const addRow = (paymentMehod) => {
    const amount = totalBillAmount.value - totalAmount.value;
    formItemStore.pushNewItem(model.value.paymentItems, {
      ...itemStore.model.value,
      amount: Math.max(amount, 0),
      typeId: paymentMehod.value.id,
      color: paymentMehod.value.color,
      header: paymentMehod.label,
    });
  };

  const deleteRow = (index) => {
    formItemStore.deleteItem(model.value.paymentItems, index);
  };

  const editRow = (index, item) => {
    formItemStore.editItem(model.value.paymentItems, index, item);
  };

  const totalAmount = computed(() =>
    helper.getSubtotal(model.value.paymentItems, "amount")
  );

  const totalBillAmount = computed(() =>
    helper.getSubtotal(model.value.billItems, "total")
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
    totalBillAmount,
    newAddedItemIndex: formItemStore.newAddedItemIndex,

    getById,
    addRow,
    editRow,
    deleteRow,

    addNewItem,
    pushNewItem,
    deleteItem,

    submitForm,
  };
}
