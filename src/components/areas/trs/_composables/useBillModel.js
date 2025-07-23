import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { useBillState } from "./useBillState";
import { helper } from "src/helpers";
import { useBillItemModel } from "./useBillItemModel";
import { useFormItemsModel } from "src/composables/useFormItemsModel";
import { billModel } from "src/models/areas/trs/billModel";

export function useBillModel({ baseRoute, preview }) {
  const router = useRouter();
  const itemStore = useBillItemModel();
  const stateStore = useBillState();

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

  // const addRow = (paymentMehod) => {
  //   formItemStore.pushNewItem(model.value.paymentItems, {
  //     ...itemStore.model.value,
  //     amount: Math.max(remainedAmount.value, 0),
  //     typeId: paymentMehod.value.id,
  //     color: paymentMehod.value.color,
  //     header: paymentMehod.label,
  //   });
  // };

  const addRow = async (item) => {
    formItemStore.pushNewItem(model.value.paymentItems, item);
  };

  const remainedAmount = computed(() => {
    return totalBillAmount.value - totalAmount.value;
  });

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
      stateStore.reset();
      router.back();
    }
  }

  return {
    model,
    crudStore,
    totalAmount,
    totalBillAmount,
    newAddedItemIndex: formItemStore.newAddedItemIndex,
    remainedAmount,

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
