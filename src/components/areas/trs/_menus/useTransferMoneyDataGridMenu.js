import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";

export function useTransferMoneyDataGridMenu(context) {
  return useDataGridMenu(context, {
    baseRoute: "trs/transferMoney",
    permissionPrefix: "trs.transferMoney",
  });
}
