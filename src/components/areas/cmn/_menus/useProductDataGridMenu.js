import { menuItemType } from "src/constants";
import { menuItems } from "src/constants/menuItems";
import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";

export function useProductDataGridMenu(context, config = {}) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return useDataGridMenu(context, {
    baseRoute: "cmn/product",
    permissionPrefix: "cmn.product",

    overrideItems: {
      edit: [
        {
          ...menuItems.edit,
          route: `/cmn/edit/product/${context.activeRow?.id}`,
          permission: "cmn.product.edit",
          visible: hasId,
        },
        {
          ...menuItems.defaultItem,
          type: menuItemType.moreItem,
          label: "editBatch",
          icon: "o_edit",
          permission: `cmn.product.edit`,
          badgeCount: context.selectedIds?.length,
          visible: hasSelection,
          subItems: [
            {
              ...menuItems.defaultItem,
              label: "editBatch",
              icon: "o_edit",
              permission: `cmn.product.edit`,
              badgeCount: context.selectedIds?.length,
              handler: () => context.editBatch?.(),
              visible: hasSelection,
            },
            {
              ...menuItems.defaultItem,
              label: "editProductPrice",
              icon: "o_edit",
              permission: `cmn.product.edit`,
              badgeCount: context.selectedIds?.length,
              handler: () => context.editBatchPrice?.(),
              visible: hasSelection,
            },
          ],
        },
      ],
    },

    extraMoreItems: [
      {
        ...menuItems.defaultItem,
        label: "activate",
        icon: "o_check",
        permission: `cmn.product.activate`,
        handler: () =>
          config?.crudStore?.activate(
            context.selectedIds,
            context.tableStore?.reloadData
          ),
        visible: hasSelection,
      },
      {
        ...menuItems.defaultItem,
        label: "deactivate",
        icon: "o_clear",
        permission: `cmn.product.activate`,
        handler: () =>
          config?.crudStore?.deactivate(
            context.selectedIds,
            context.tableStore?.reloadData
          ),
        visible: hasSelection,
        addSeparator: true,
      },
    ],
  });
}
