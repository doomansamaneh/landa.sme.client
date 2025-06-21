import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function usePaymentPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "trs.payment",
    exclude: ["sendMail"],
  });
}
