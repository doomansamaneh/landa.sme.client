import { menuItems } from "src/constants/menuItems";
import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function usePurchasePreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "sls.purchase",
    // routes: {
    //   edit: (id) => `/sls/purchase/edit/${id}`,
    //   copy: (id) => `/sls/purchase/copy/${id}`,
    // },
    extraPrintItems: [
      (id) => ({
        ...menuItems.print,
        label: "printInventoryReceipt",
        route: `/sls/purchase/receiptPreview/${id}`,
        permission: "sls.purchase.print",
        visible: true,
        addSeparator: true,
      }),
    ],
  });
}
