import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";
import { menuItemType } from "src/constants";
import { menuItems } from "src/constants/menuItems";

export function useSalesReturnDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return useDataGridMenu(context, {
    baseRoute: "sls/salesReturn",
    permissionPrefix: "sls.salesReturn",

    overrideItems: {
      create: {
        ...menuItems.create,
        type: menuItemType.moreItem,
        permission: "sls.salesReturn.create",
        subItems: [
          {
            ...menuItems.defaultItem,
            label: "create",
            icon: "o_add",
            permission: "sls.salesReturn.create",
            route: "/sls/salesReturn/create",
          },
          {
            ...menuItems.defaultItem,
            label: "createV2",
            icon: "o_bolt",
            permission: "sls.salesReturn.create",
            route: "/sls/salesReturn/createV2",
          },
        ],
      },

      edit: [
        {
          ...menuItems.edit,
          permission: "sls.salesReturn.edit",
          route: `/sls/salesReturn/edit/${context.activeRow?.id}`,
          visible: hasId,
        },
        {
          ...menuItems.defaultItem,
          label: "editBatch",
          icon: "o_edit",
          permission: "sls.salesReturn.edit",
          badgeCount: context.selectedIds?.length,
          handler: () => context.editBatch?.(),
          visible: hasSelection,
        },
      ],
    },
  });
}
