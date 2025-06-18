import { voucherStatus } from "src/constants";
import { menuItems } from "src/constants/menuItems";
import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useQuotePreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "sls.quote",
    exclude: ["sendMail"],

    overrideItems: {
      more: {
        ...menuItems.more,
        subItems: [
          {
            ...menuItems.defaultItem,
            icon: "send",
            label: "sendMail",
            permission: `sls.quote.print`,
            handler: () => context.sendMail?.(),
          },
          {
            ...menuItems.defaultItem,
            label: "convertToInvoice",
            icon: "o_receipt",
            permission: "sls.invoice.create",
            route: `/sls/invoice/createFromQuote/${context.model?.id}`,
            visible: context.model.statusId === voucherStatus.init,
          },
        ],
      },
    },
  });
}
