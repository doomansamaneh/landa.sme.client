import { menuItems } from "src/constants/menuItems";
import { voucherStatus } from "src/constants";
import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function usePurchasePreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "sls.purchase",
    exclude: ["sendMail"],
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

    overrideItems: {
      more: {
        ...menuItems.more,
        subItems: [
          {
            ...menuItems.defaultItem,
            icon: "send",
            label: "sendMail",
            permission: `sls.purchase.print`,
            handler: () => context.sendMail?.(),
            addSeparator: true,
          },
          {
            ...menuItems.defaultItem,
            label: "cancelInvoice",
            icon: "o_close",
            permission: "sls.purchase.cancelInvoice",
            handler: () => context.cancelInvoice?.(),
            visible:
              context.model.statusId !== voucherStatus.canceled,
            addSeparator: true,
          },
          {
            ...menuItems.defaultItem,
            label: "copyToSales",
            icon: "o_shopping_cart",
            permission: "sls.invoice.create",
            route: `/sls/invoice/CreateFromPurchase/${context.activeRow?.id}`,
            visible: true,
          },
          {
            ...menuItems.defaultItem,
            label: "purchaseReturn",
            icon: "o_undo",
            permission: "sls.purchaseReturn.create",
            route: `/sls/purchaseReturn/createFromPurchase/${context.activeRow?.id}`,
            visible: true,
          },
        ],
      },
    },
  });
}
