import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { wageModel } from "src/models/areas/prl/wageModel";
import { useWageState } from "./useWageState";
import { insurranceType } from "src/constants";

export function useWageModel({ baseRoute, preview }) {
  const router = useRouter();
  const stateStore = useWageState();

  const model = ref(wageModel);

  const crudStore = useFormActions(baseRoute, model);

  async function getById(id, action) {
    let responseData = null;
    if (id) {
      if (preview) responseData = await crudStore.getPreviewById(id);
      else responseData = await crudStore.getById(id);
    } else responseData = await crudStore.getCreateModel(setItems);

    setItems();

    if (responseData) {
      if (action === "copy") {
        model.value.fiscalYearId = null;
      }
    }
  }

  function setItems() {
    if (!model.value.wageItems) {
      model.value.wageItems = [];
    }
    if (!model.value.subject) {
      model.value.subject = "wage";
    }
  }

  const addRow = (index, currentRow) => {
    const newRow = {
      ...currentRow,
      customerId: null,
      customerName: null,
    };
    model.value.wageItems.splice(index + 1, 0, newRow);
  };

  const pushNewRow = (item) => {
    if (item) model.value.wageItems.push(item);
    else
      model.value.wageItems.push({
        day: 30,
        salary: 0,
        food: 0,
        housing: 0,
        mission: 0,
        insurranceTypeId: insurranceType.normal,
        child: 0,
        leave: 0,
        bonus: 0,
        overtime: 0,
        addition: 0,
        deduction: 0,
        bonus: 0,
        reward: 0,
        serviceBenefit: 0,
      });
  };

  const deleteRow = (index) => {
    model.value.wageItems.splice(index, 1);
  };

  const editRow = (index, item) => {
    const row = model.value.wageItems[index];
    Object.assign(row, item);
  };

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

    getById,
    addRow,
    pushNewRow,
    editRow,
    deleteRow,
    submitForm,
  };
}
