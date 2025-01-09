import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import { fetchWrapper, bus } from "src/helpers";
import { closeAccounts } from "src/constants";
import { useVoucherState } from "./useVoucherState";

import ConfirmDialog from "src/components/shared/ConfirmDialog.vue";

const operationStatusModel = ref({
  hasOpenBook: false,
  hasCloseBook: false,
});

export function useAccountingOperations() {
  const $q = useQuasar();
  const { t } = useI18n();
  const voucherStore = useVoucherState();
  const model = ref({});

  function confirmDialog({ title, message, ok, okColor, onOk }) {
    return $q
      .dialog({
        component: ConfirmDialog,
        componentProps: { title, message, ok, okColor },
      })
      .onOk(onOk);
  }

  function notify(response, type = "positive") {
    voucherStore.reset();
    $q.notify({
      type,
      message: t(`messages.${response.data.message}`),
    });
  }

  async function getOperationStatus() {
    const response = await fetchWrapper.get(
      `acc/operation/getOperationStatus`,
      null,
      true
    );
    operationStatusModel.value = response.data.data;
  }

  async function reorder(callBack) {
    confirmDialog({
      title: t("shared.labels.reorder"),
      message: t("shared.labels.reorderMessage"),
      ok: t("shared.labels.reorder"),
      okColor: "blue-7",
      onOk: async () => {
        const response = await fetchWrapper.post(
          `acc/operation/reorder`
        );
        notify(response);
        if (callBack) callBack();
      },
    });
  }

  async function calculateCogs(callBack) {
    confirmDialog({
      title: t("shared.labels.calculateCogs"),
      message: t("shared.labels.calculateCogsMessage"),
      ok: t("shared.labels.calculateCogs"),
      okColor: "blue-7",
      onOk: async () => {
        const response = await fetchWrapper.post(
          `acc/operation/calculateCogs`
        );
        notify(response);
        if (callBack) callBack();
      },
    });
  }

  async function openBook(callBack) {
    confirmDialog({
      title: t("shared.labels.openBook"),
      message: t("shared.labels.openBookMessage"),
      ok: t("shared.labels.openBook"),
      okColor: "blue-7",
      onOk: async () => {
        const response = await fetchWrapper.post(
          `acc/operation/openBook`
        );
        notify(response);
        if (callBack) callBack();
      },
    });
  }

  async function closeBook(callBack) {
    confirmDialog({
      title: t("shared.labels.closeBook"),
      message: t("shared.labels.closeBookMessage"),
      ok: t("shared.labels.closeBook"),
      okColor: "blue-7",
      onOk: async () => {
        const response = await fetchWrapper.post(
          `acc/operation/closeBook`
        );
        notify(response);
        if (callBack) callBack();
      },
    });
  }

  async function deleteClosingBook(callBack) {
    confirmDialog({
      title: t("shared.labels.deleteClosingBook"),
      message: t("shared.labels.deleteMessage"),
      ok: t("shared.labels.deleteClosingBook"),
      okColor: "deep-orange-7",
      onOk: async () => {
        const response = await fetchWrapper.post(
          `acc/operation/deleteClosingBook`
        );
        notify(response);
        if (callBack) callBack();
      },
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
      (item) => ({
        id: item,
      })
    );
    const response = await fetchWrapper.post(
      `acc/operation/closeAccount`,
      model.value
    );
    notify(response);
    if (callBack) callBack(response);
  }

  onMounted(() => {
    getOperationStatus();
    bus.on("render-page", getOperationStatus);
  });

  onUnmounted(() => {
    bus.off("render-page", getOperationStatus);
  });

  return {
    model,
    operationStatusModel,

    reorder,
    calculateCogs,
    openBook,
    closeBook,
    closeAccount,
    deleteClosingBook,
    getCloseAccountModel,
    getOperationStatus,
  };
}
