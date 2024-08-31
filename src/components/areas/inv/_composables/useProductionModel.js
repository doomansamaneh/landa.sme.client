import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { productionModel } from "src/models/areas/inv/productionModel";

export function useProductionModel({ baseRoute }) {
  const router = useRouter();

  const model = ref(productionModel);

  const crudStore = useFormActions(baseRoute, model);

  async function getById(id, action) {
    let responseData = null;
    if (id) {
      responseData = await crudStore.getById(id);
    } else responseData = await crudStore.getCreateModel();

    if (responseData) {
      if (action === "copy") {
        model.value.fiscalYearId = null;
      }
    }

    setItems();
  }

  function setItems() {
    if (!model.value.items) model.value.items = [];
    if (!model.value.usedItems) model.value.usedItems = [];
    if (!model.value.costs) model.value.costs = [];
  }

  const addNewItem = (index) => {
    const newRow = { quantity: 0 };
    model.value.items.splice(index + 1, 0, newRow);
  };

  const pushNewItem = (item) => {
    if (item) model.value.items.push(item);
    else model.value.items.push({ quantity: 0 });
  };

  const deleteItem = (index) => {
    model.value.items.splice(index, 1);
  };

  const addNewCost = (index) => {
    const newRow = { amount: 0 };
    model.value.costs.splice(index + 1, 0, newRow);
  };

  const pushNewCost = (item) => {
    if (item) model.value.costs.push(item);
    else model.value.costs.push({ amount: 0 });
  };

  const deleteCost = (index) => {
    model.value.costs.splice(index, 1);
  };

  const addNewUsedItem = (index) => {
    const newRow = { quantity: 0 };
    model.value.usedItems.splice(index + 1, 0, newRow);
  };

  const pushNewUsedItem = (item) => {
    if (item) model.value.usedItems.push(item);
    else model.value.usedItems.push({ quantity: 0 });
  };

  const deleteUsedItem = (index) => {
    model.value.usedItems.splice(index, 1);
  };

  async function submitForm(form, action) {
    await crudStore.submitForm(form, action, saveCallBack);
    function saveCallBack(responseData) {
      //stateStore.state.firstLoad.value = false;
      router.back();
    }
  }

  return {
    model,
    crudStore,

    getById,

    addNewItem,
    pushNewItem,
    deleteItem,

    addNewUsedItem,
    pushNewUsedItem,
    deleteUsedItem,

    addNewCost,
    pushNewCost,
    deleteCost,

    submitForm,
  };
}
