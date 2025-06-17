import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useBillPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "trs.bill",
  });
}
