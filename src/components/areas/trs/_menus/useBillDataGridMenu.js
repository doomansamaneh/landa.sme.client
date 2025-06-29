import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";

export function useBillDataGridMenu(context) {
  return useDataGridMenu(context, {
    baseRoute: "trs/bill",
    permissionPrefix: "trs.bill",
    exclude: ["print", "printBatch"],
  });
}
