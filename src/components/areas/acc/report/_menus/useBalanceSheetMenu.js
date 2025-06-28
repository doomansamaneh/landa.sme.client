import { computed } from "vue";
import { menuItems } from "src/constants/menuItems";
import { usePreview } from "src/composables/usePreview";
import { useBalanceSheet } from "src/components/areas/acc/_composables/useBalanceSheet";

import DataGridPreview from "src/components/areas/acc/report/shared/balanceSheet/printPreview/DataGridPreview.vue";

export function useBalanceSheetMenu(context) {
  const permissionPrefix = "acc.report";

  const previewStore = usePreview();
  const dataStore = useBalanceSheet();

  const openPreview = () => {
    previewStore.openDialog({
      title: "main-menu-items.Acc_Report_BalanceSheet",
      component: DataGridPreview,
      previewProps: {
        tableStore: dataStore,
        title: "main-menu-items.Acc_Report_BalanceSheet",
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
