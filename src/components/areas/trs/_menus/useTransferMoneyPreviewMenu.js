import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useTransferMoneyPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "trs.transferMoney",
    exclude: ["sendMail"],
  });
}
