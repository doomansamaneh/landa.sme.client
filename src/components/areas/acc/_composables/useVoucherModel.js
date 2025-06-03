import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { fetchWrapper, helper } from "src/helpers";
import { useVoucherItemModel } from "./useVoucherItemModel";
import { useFormItemsModel } from "src/composables/useFormItemsModel";
import { voucherModel } from "src/models/areas/acc/voucherModel";
import { useVoucherState } from "./useVoucherState";
import { subSystem } from "src/constants";

export function useVoucherModel({ baseRoute, preview }) {
  const router = useRouter();
  const voucherStore = useVoucherState();
  const itemStore = useVoucherItemModel();

  const model = ref(voucherModel);

  const crudStore = useFormActions(baseRoute, model);
  const formItemStore = useFormItemsModel();

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

  async function getOpeningModel() {
    const responseData = await crudStore.customGetAction(
      "GetOpeningVoucherModel"
    );
    model.value = responseData.data;
    setVoucherItems();
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
    formItemStore.addNewItem(model.value.voucherItems, index, newRow);
  };

  const pushNewRow = (item) => {
    if (item)
      formItemStore.pushNewItem(model.value.voucherItems, item);
    else {
      formItemStore.pushNewItem(
        model.value.voucherItems,
        itemStore.model.value
      );
    }
  };

  const deleteRow = (index) => {
    formItemStore.deleteItem(model.value.voucherItems, index);
  };

  const editRow = (index, item) => {
    formItemStore.editItem(model.value.voucherItems, index, item);
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
      voucherStore.reset();
      router.back();
    }
  }

  return {
    model,
    crudStore,
    totalDebit,
    totalCredit,
    totalDif,
    newAddedItemIndex: formItemStore.newAddedItemIndex,

    getById,
    getOpeningModel,
    getRelation,
    pushNewRow,
    addNewRow,
    editRow,
    deleteRow,
    submitForm,
  };
}
