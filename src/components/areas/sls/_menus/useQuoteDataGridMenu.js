import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";
import { menuItemType } from "src/constants";
import { menuItems } from "src/constants/menuItems";

export function useQuoteDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return useDataGridMenu(context, {
    baseRoute: "sls/quote",
    permissionPrefix: "sls.quote",

    overrideItems: {
      create: {
        ...menuItems.create,
        type: menuItemType.moreItem,
        permission: "sls.quote.create",
        subItems: [
          {
            ...menuItems.defaultItem,
            label: "create",
            icon: "o_add",
            permission: "sls.quote.create",
            route: "/sls/quote/create",
          },
          {
            ...menuItems.defaultItem,
            label: "createV2",
            icon: "o_bolt",
            permission: "sls.quote.create",
            route: "/sls/quote/createV2",
          },
        ],
      },
      edit: [
        {
          ...menuItems.edit,
          permission: "sls.quote.edit",
          route: `/sls/quote/edit/${context.activeRow?.id}`,
          visible: hasId,
        },
        {
          ...menuItems.defaultItem,
          label: "editBatch",
          icon: "o_edit",
          permission: "sls.quote.edit",
          badgeCount: context.selectedIds?.length,
          handler: () => context.editBatch?.(),
          visible: hasSelection,
        },
      ],
    },

    extraMoreItems: [
      {
        ...menuItems.defaultItem,
        label: "convertToInvoice",
        icon: "o_receipt",
        permission: "sls.invoice.create",
        route: `/sls/invoice/createFromQuote/${context.activeRow?.id}`,
        visible: hasId,
        addSeparator: true,
      },
    ],
  });
}
