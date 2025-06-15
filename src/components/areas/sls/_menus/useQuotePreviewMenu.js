import { menuItems } from "src/constants/menuItems";
import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useQuotePreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "sls.quote",
  });
}
