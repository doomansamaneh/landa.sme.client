import { computed } from "vue";
import { menuItems } from "src/constants/menuItems";
// import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useWagePreviewMenu(context) {
  return computed(() => {
    const id = context.model?.id;
    const permissionPrefix = "prl.wage";

    return [
      {
        ...menuItems.edit,
        class: "primary-gradient primary-shadow text-white",
        permission: `${permissionPrefix}.edit`,
        route: `/${context.baseRoute}/edit/${id}`,
        visible: true,
      },
      {
        ...menuItems.more,
        label: "more",
        visible: true,
        subItems: [
          {
            ...menuItems.copy,
            permission: `${permissionPrefix}.clone`,
            route: `/${context.baseRoute}/copy/${id}`,
            visible: true,
          },
          {
            ...menuItems.print,
            permission: `${permissionPrefix}.print`,
            handler: () => context.print?.(),
            visible: true,
            addSeparator: true,
          },
          {
            ...menuItems.defaultItem,
            label: "downloadInsurrance",
            icon: "o_description",
            permission: `${permissionPrefix}.print`,
            handler: () => context.exportInsurance?.(),
            visible: true,
          },
          {
            ...menuItems.defaultItem,
            label: "downloadTax",
            icon: "o_description",
            permission: `${permissionPrefix}.print`,
            handler: () => context.exportTax?.(),
            visible: true,
            addSeparator: true,
          },
          {
            ...menuItems.delete,
            permission: `${permissionPrefix}.delete`,
            handler: () => context.deleteById?.(),
            visible: true,
            addSeparator: false,
          },
        ],
      },
    ];
  });
}
