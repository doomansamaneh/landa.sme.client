import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useCloseOrderPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "inv.closeOrder",
  });
}
