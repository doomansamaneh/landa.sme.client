import { menuItems } from "src/constants/menuItems";
import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useInvoicePreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "sls.invoice",
    // routes: {
    //   edit: (id) => `/sls/invoice/edit/${id}`,
    //   copy: (id) => `/sls/invoice/copy/${id}`,
    // },
    extraPrintItems: [
      (id) => ({
        ...menuItems.print,
        label: "printAddress",
        route: `/sls/invoice/addressPreview/${id}`,
        permission: "sls.invoice.print",
        visible: true,
      }),
      (id) => ({
        ...menuItems.print,
        label: "printInventoryExit",
        route: `/sls/invoice/exitPreview/${id}`,
        permission: "sls.invoice.print",
        visible: true,
        addSeparator: true,
      }),
    ],
  });
}
