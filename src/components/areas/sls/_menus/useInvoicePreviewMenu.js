import { menuItems } from "src/constants/menuItems";
import { voucherStatus } from "src/constants";
import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useInvoicePreviewMenu(context) {
  console.log(context.model);
  return usePreviewMenu(context, {
    permissionPrefix: "sls.invoice",
    exclude: ["sendMail"],
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

    overrideItems: {
      more: {
        ...menuItems.more,
        subItems: [
          {
            ...menuItems.defaultItem,
            icon: "send",
            label: "sendMail",
            permission: `sls.invoice.print`,
            handler: () => context.sendMail?.(),
            addSeparator: true,
          },
          {
            ...menuItems.defaultItem,
            label: "cancelInvoice",
            icon: "o_close",
            permission: "sls.invoice.cancelInvoice",
            handler: () => context.cancelInvoice?.(),
            visible:
              context.model.statusId !== voucherStatus.canceled,
            addSeparator: true,
          },
          {
            ...menuItems.defaultItem,
            label: "copyToPurchase",
            icon: "o_shopping_cart",
            permission: "sls.purchase.create",
            route: `/sls/purchase/createFromInvoice/${context.model?.id}`,
            visible: true,
          },
          {
            ...menuItems.defaultItem,
            label: "salesReturn",
            icon: "o_undo",
            permission: "sls.salesReturn.create",
            route: `/sls/salesReturn/createFromInvoice/${context.model?.id}`,
            visible: true,
          },
        ],
      },
    },
  });
}
