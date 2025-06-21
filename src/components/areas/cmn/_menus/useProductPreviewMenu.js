import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useProductPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "cmn.product",
  });
}
