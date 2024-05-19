import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useFormActions } from "src/composables/useFormActions";
import { fetchWrapper, helper } from "src/helpers";
import { useVoucherItemModel } from "./useVoucherItemModel";
import { voucherModel } from "src/models/areas/acc/voucherModel";
import { useVoucherState } from "./useVoucherState";
import { voucherType, subSystem } from "src/constants";

export function useVoucherModel({ baseRoute, preview }) {
  const $q = useQuasar();
  const router = useRouter();
  const voucherStore = useVoucherState();
  const itemStore = useVoucherItemModel();

  const model = ref(voucherModel);

  const crudStore = useFormActions(baseRoute, model);

  async function getById(id, action) {
    let responseData = null;
    if (id) {
      if (preview) responseData = await crudStore.getPreviewById(id);
      else responseData = await crudStore.getById(id);
    } else
      responseData = await crudStore.getCreateModel(setVoucherItems);

    setVoucherItems();

    if (responseData) {
      if (action === "copy") {
        model.value.no = 0;
        model.value.systemId = subSystem.accounting;
        //model.value.createdBy = subSystem.accounting;
        //model.value.typeId = subSystem.accounting;
        model.value.fiscalYearId = null;
      }
    }
  }

  async function getRelation(id) {
    const responseData = await fetchWrapper.get(
      `${baseRoute}/VoucherRelation/${id}`
    );
    return responseData.data.data;
  }

  function setVoucherItems() {
    if (!model.value.voucherItems) model.value.voucherItems = [];
  }

  const addNewRow = (index, currentRow) => {
    const newRow = { ...itemStore.model.value };
    model.value.voucherItems.splice(index + 1, 0, newRow);
  };

  const pushNewRow = (item) => {
    if (item) model.value.voucherItems.push(item);
    else model.value.voucherItems.push(itemStore.model.value);
  };

  const deleteRow = (index) => {
    model.value.voucherItems.splice(index, 1);
  };

  const editRow = (index, item) => {
    const row = model.value.voucherItems[index];
    Object.assign(row, item);
  };

  const totalDebit = computed(() =>
    helper.getSubtotal(model.value.voucherItems, "debit")
  );
  const totalCredit = computed(() =>
    helper.getSubtotal(model.value.voucherItems, "credit")
  );
  const totalDif = computed(
    () => totalDebit.value - totalCredit.value
  );

  async function submitForm(form, action) {
    await crudStore.submitForm(form, action, saveCallBack);
    function saveCallBack(responseData) {
      voucherStore.state.firstLoad.value = false;
      router.back();
    }
  }

  return {
    model,
    crudStore,
    totalDebit,
    totalCredit,
    totalDif,

    getById,
    getRelation,
    pushNewRow,
    addNewRow,
    editRow,
    deleteRow,
    submitForm,
  };
}
