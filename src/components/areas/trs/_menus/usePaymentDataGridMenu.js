import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";

export function usePaymentDataGridMenu(context) {
  return useDataGridMenu(context, {
    baseRoute: "trs/payment",
    permissionPrefix: "trs.payment",
    exclude: ["print", "printBatch"],
  });
}
