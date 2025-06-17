import { menuItems } from "src/constants/menuItems";
import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";

export function useCustomerDataGridMenu(context) {
  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return useDataGridMenu(context, {
    baseRoute: "crm/customer",
    permissionPrefix: "crm.customer",

    overrideItems: {
      edit: [
        {
          ...menuItems.edit,
          permission: `crm.customer.edit`,
          route: `/crm/customer/edit/${context.activeRow?.id}`,
          visible: hasId,
        },
        {
          ...menuItems.defaultItem,
          label: "editBatch",
          icon: "o_edit",
          permission: `crm.customer.edit`,
          badgeCount: context.selectedIds?.length,
          handler: () => context.editBatch?.(),
          visible: hasSelection,
        },
      ],
    },
  });
}
