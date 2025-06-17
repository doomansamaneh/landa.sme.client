import { computed } from "vue";
import { menuItems } from "src/constants/menuItems";

export function useDataGridMenu(context, config = {}) {
  const {
    baseRoute = "",
    permissionPrefix = "",
    extraMoreItems = [],
    overrideItems = {},
    exclude = [],
  } = config;

  const getItem = (key, fallbackItem) => {
    if (exclude.includes(key)) return [];
    const override = overrideItems[key];
    if (override == null) return [fallbackItem];
    return Array.isArray(override) ? override : [override];
  };

  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  return computed(() => {
    const menu = [
      ...getItem("create", {
        ...menuItems.create,
        permission: `${permissionPrefix}.create`,
        route: `/${baseRoute}/create`,
      }),

      ...getItem("edit", {
        ...menuItems.edit,
        permission: `${permissionPrefix}.edit`,
        route: `/${baseRoute}/edit/${context.activeRow?.id}`,
        visible: hasId,
      }),

      ...getItem("copy", {
        ...menuItems.copy,
        permission: `${permissionPrefix}.clone`,
        route: `/${baseRoute}/copy/${context.activeRow?.id ?? ""}`,
        visible: hasId,
      }),

      ...getItem("delete", {
        ...menuItems.delete,
        permission: `${permissionPrefix}.delete`,
        badgeCount: context.selectedIds?.length,
        visible: hasId || hasSelection,
        handler: () => {
          if (hasSelection) context.deleteBatch?.();
          else if (hasId) context.deleteById?.();
        },
      }),

      ...(Array.isArray(overrideItems.more)
        ? overrideItems.more
        : [
            {
              ...menuItems.more,
              subItems: [
                {
                  ...menuItems.refresh,
                  handler: () => context.reloadData?.(),
                },
                ...extraMoreItems,
                {
                  ...menuItems.print,
                  permission: `${permissionPrefix}.print`,
                  visible: hasId,
                  handler: () => context.print?.(),
                },
                {
                  ...menuItems.printBatch,
                  permission: `${permissionPrefix}.print`,
                  addSeparator: true,
                  handler: () => context.printBatch?.(),
                },
                {
                  ...menuItems.exportExcel,
                  permission: `${permissionPrefix}.export`,
                  handler: () => context.exportAll?.(),
                },
                {
                  ...menuItems.exportExcelCurrentPage,
                  permission: `${permissionPrefix}.export`,
                  handler: () => context.exportCurrentPage?.(),
                },
              ],
            },
          ]),
    ];

    return menu;
  });
}
