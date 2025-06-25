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

  const hasId = !!context.activeRow?.id;
  const hasSelection = context.selectedIds?.length > 0;

  const getItem = (key, fallbackItem) => {
    if (exclude.includes(key)) return [];
    const override = overrideItems[key];
    if (override == null) return [fallbackItem];
    return Array.isArray(override) ? override : [override];
  };

  const getMoreItem = () => {
    if (exclude.includes("more")) return [];

    const fallbackSubItems = [
      {
        ...menuItems.refresh,
        handler: () => context.reloadData?.(),
        addSeparator: true,
      },
      ...extraMoreItems,
      ...getItem("print", {
        ...menuItems.print,
        permission: `${permissionPrefix}.print`,
        visible: hasId,
        handler: () => context.print?.(),
      }),
      ...getItem("printBatch", {
        ...menuItems.printBatch,
        permission: `${permissionPrefix}.print`,
        visible: true,
        addSeparator: true,
        handler: () => context.printBatch?.(),
      }),
      ...getItem("exportExcel", {
        ...menuItems.exportExcel,
        permission: `${permissionPrefix}.export`,
        handler: () => context.exportAll?.(),
      }),
      ...getItem("exportExcelCurrentPage", {
        ...menuItems.exportExcelCurrentPage,
        permission: `${permissionPrefix}.export`,
        handler: () => context.exportCurrentPage?.(),
      }),
    ];

    const override = overrideItems["more"];
    if (Array.isArray(override)) return override;

    return [
      {
        ...menuItems.more,
        subItems: fallbackSubItems,
      },
    ];
  };

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

      ...getMoreItem(),
    ];

    return menu;
  });
}
