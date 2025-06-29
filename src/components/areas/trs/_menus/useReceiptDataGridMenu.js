import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";

export function useReceiptDataGridMenu(context) {
  return useDataGridMenu(context, {
    baseRoute: "trs/receipt",
    permissionPrefix: "trs.receipt",
    exclude: ["print", "printBatch"],
  });
}
