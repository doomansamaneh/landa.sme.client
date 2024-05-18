import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useFormActions } from "src/composables/useFormActions";
import { helper } from "src/helpers";
import { useVoucherItemModel } from "./useVoucherItemModel";
import { voucherModel } from "src/models/areas/acc/voucherModel";

import ResponseDialog from "src/components/areas/sls/invoice/shared/forms/ResponseDialog.vue";

export function useVoucherModel({ baseRoute, preview }) {
  const $q = useQuasar();
  const router = useRouter();
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
        model.value.systemId = null;
        model.value.fiscalYearId = null;
      }
    }
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
      if (responseData?.code === 200) {
        $q.dialog({
          component: ResponseDialog,
          componentProps: {
            responseData: responseData.data,
            baseRoute: config.baseRoute,
            //title: t("shared.labels.deleteConfirm"),
            //message: `${t("shared.labels.deleteMessage")}.`,
            // ok: t("shared.labels.delete"),
            // okColor: "deep-orange-7",
          },
        }).onOk(async () => {
          router.back();
        });
      }
    }
  }

  return {
    model,
    crudStore,
    totalDebit,
    totalCredit,
    totalDif,

    getById,
    pushNewRow,
    addNewRow,
    editRow,
    deleteRow,
    submitForm,
  };
}
