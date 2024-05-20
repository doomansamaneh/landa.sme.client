import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import { fetchWrapper } from "src/helpers";
import { closeAccounts } from "src/constants";

import ConfirmDialog from "src/components/shared/ConfirmDialog.vue";

export function useAccountingOperations() {
  const $q = useQuasar();
  const { t } = useI18n();
  const model = ref({});

  async function reorder(callBack) {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        title: t("shared.labels.reorder"),
        message: t("shared.labels.reorderMessage"),
        ok: t("shared.labels.reorder"),
        okColor: "blue-7",
      },
    }).onOk(async () => {
      const response = await fetchWrapper.post(
        `acc/operation/reorder`
      );
      $q.notify({
        type: "positive",
        message: response.data.message,
      });
      if (callBack) callBack();
    });
  }

  async function calculateCogs(callBack) {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        title: t("shared.labels.calculateCogs"),
        message: t("shared.labels.calculateCogsMessage"),
        ok: t("shared.labels.calculateCogs"),
        okColor: "blue-7",
      },
    }).onOk(async () => {
      const response = await fetchWrapper.post(
        `acc/operation/calculateCogs`
      );
      $q.notify({
        type: "positive",
        message: response.data.message,
      });
      if (callBack) callBack();
    });
  }

  async function openBook(callBack) {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        title: t("shared.labels.openBook"),
        message: t("shared.labels.openBookMessage"),
        ok: t("shared.labels.openBook"),
        okColor: "blue-7",
      },
    }).onOk(async () => {
      const response = await fetchWrapper.post(
        `acc/operation/openBook`
      );
      $q.notify({
        type: "positive",
        message: response.data.message,
      });
      if (callBack) callBack();
    });
  }

  async function closeBook(callBack) {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        title: t("shared.labels.closeBook"),
        message: t("shared.labels.closeBookMessage"),
        ok: t("shared.labels.closeBook"),
        okColor: "blue-7",
      },
    }).onOk(async () => {
      const response = await fetchWrapper.post(
        `acc/operation/closeBook`
      );
      $q.notify({
        type: "positive",
        message: response.data.message,
      });
      if (callBack) callBack();
    });
  }

  async function deleteClosingBook(callBack) {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        title: t("shared.labels.deleteClosingBook"),
        message: t("shared.labels.deleteMessage"),
        ok: t("shared.labels.deleteClosingBook"),
        okColor: "deep-orange-7",
      },
    }).onOk(async () => {
      const response = await fetchWrapper.post(
        `acc/operation/deleteClosingBook`
      );
      $q.notify({
        type: "negative",
        message: response.data.message,
      });
      if (callBack) callBack();
    });
  }

  async function getCloseAccountModel() {
    const response = await fetchWrapper.get(
      "acc/operation/getCloseAccountModel"
    );
    model.value = response.data.data;
    model.value.closeAccounts = [
      closeAccounts.revenue,
      closeAccounts.expense,
      closeAccounts.cogs,
    ];
  }

  async function closeAccount(callBack) {
    model.value.accountTypeIdList = model.value.closeAccounts.map(
      (item) => ({ id: item })
    );
    const response = await fetchWrapper.post(
      `acc/operation/closeAccount`,
      model.value
    );
    if (callBack) callBack();
  }

  return {
    model,

    reorder,
    calculateCogs,
    openBook,
    closeBook,
    getCloseAccountModel,
    closeAccount,
    deleteClosingBook,
  };
}
