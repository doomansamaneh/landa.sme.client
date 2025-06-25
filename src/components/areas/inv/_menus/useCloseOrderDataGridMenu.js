import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";

export function useCloseOrderDataGridMenu(context) {
  return useDataGridMenu(context, {
    baseRoute: "inv/closeOrder",
    permissionPrefix: "inv.closeOrder",

    exclude: ["print", "printBatch"],
  });
}
