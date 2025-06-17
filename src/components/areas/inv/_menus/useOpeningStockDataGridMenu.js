import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";

export function useOpeningStockDataGridMenu(context) {
  return useDataGridMenu(context, {
    baseRoute: "inv/openingStock",
    permissionPrefix: "inv.openingStock",
  });
}
