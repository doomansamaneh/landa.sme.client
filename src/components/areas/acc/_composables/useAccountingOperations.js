import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import { fetchWrapper } from "src/helpers";
import ConfirmDialog from "src/components/shared/ConfirmDialog.vue";

export function useAccountingOperations() {
  const $q = useQuasar();
  const { t } = useI18n();

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

  return {
    reorder,
  };
}
