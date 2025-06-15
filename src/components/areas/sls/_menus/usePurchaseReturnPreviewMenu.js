import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function usePurchaseReturnPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "sls.purchaseReturn",
  });
}
