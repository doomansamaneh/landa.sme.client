import { computed } from "vue";
import { menuItems } from "src/constants/menuItems";
import { usePreview } from "src/composables/usePreview";
import { useIncomeStatement } from "src/components/areas/acc/_composables/useIncomeStatement";

import DataGridPreview from "src/components/areas/acc/report/shared/incomeStatement/printPreview/DataGridPreview.vue";

export function useIncomeStatementMenu(context) {
  const permissionPrefix = "acc.report";

  const previewStore = usePreview();
  const dataStore = useIncomeStatement();

  const openPreview = () => {
    previewStore.openDialog({
      title: "main-menu-items.Acc_Report_IncomeStatement",
      component: DataGridPreview,
      previewProps: {
        tableStore: dataStore,
        title: "main-menu-items.Acc_Report_IncomeStatement",
      },
    });
  };

  return computed(() => [
    {
      ...menuItems.print,
      class: "primary-shadow primary-gradient text-white",
      permission: `${permissionPrefix}.AccountReview`,
      visible: true,
      handler: openPreview,
    },
  ]);
}
