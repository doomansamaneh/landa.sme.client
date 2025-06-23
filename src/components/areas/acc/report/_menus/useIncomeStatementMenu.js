import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { menuItems } from "src/constants/menuItems";
import { usePreview } from "src/composables/usePreview";
import { useIncomeStatement } from "src/components/areas/acc/_composables/useIncomeStatement";

import DataGridPreview from "src/components/areas/acc/report/shared/IncomeStatement/printPreview/DataGridPreview.vue";

export function useIncomeStatementMenu(context, config = {}) {
  const { t } = useI18n();
  const {
    permissionPrefix = "acc.report.incomeStatement",
    baseRoute = "acc/report",
    title = t(`main-menu-items.Acc_Report_IncomeStatement`),
  } = config;

  const previewStore = usePreview();
  const dataStore = useIncomeStatement();

  const openPreview = () => {
    previewStore.openDialog({
      title,
      component: DataGridPreview,
      previewProps: {
        tableStore: dataStore,
        title,
      },
    });
  };

  return computed(() => [
    {
      ...menuItems.print,
      class: "primary-shadow primary-gradient text-white",
      permission: `${permissionPrefix}.print`,
      visible: true,
      handler: openPreview,
    },
  ]);
}
