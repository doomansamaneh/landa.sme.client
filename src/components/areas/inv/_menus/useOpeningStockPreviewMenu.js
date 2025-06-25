import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useOpeningStockPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "inv.openingStock",
    exclude: ["printPdf"],
  });
}
