import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useSalesReturnPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "sls.salesReturn",
  });
}
