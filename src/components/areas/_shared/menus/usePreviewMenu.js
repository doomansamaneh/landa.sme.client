import { computed } from "vue";
import { menuItems } from "src/constants/menuItems";

export function usePreviewMenu(context, config = {}) {
  const {
    permissionPrefix = "",
    extraPrintItems = [],
    overrideItems = {},
    exclude = [],
  } = config;

  const getItem = (key, fallbackItem) => {
    if (exclude.includes(key)) return [];
    const override = overrideItems[key];
    if (override == null) return [fallbackItem];
    return Array.isArray(override) ? override : [override];
  };

  const id = context.model?.id;
  return computed(() => {
    const menu = [
      ...getItem("edit", {
        ...menuItems.edit,
        class: "primary-gradient primary-shadow text-white",
        permission: `${permissionPrefix}.edit`,
        route:
          config.routes?.edit?.(id) ||
          `/${context.baseRoute}/edit/${id}`,
        visible: true,
      }),

      ...getItem("copy", {
        ...menuItems.copy,
        permission: `${permissionPrefix}.clone`,
        route:
          config.routes?.copy?.(id) ||
          `/${context.baseRoute}/copy/${id}`,
        visible: true,
      }),

      ...getItem("delete", {
        ...menuItems.delete,
        permission: `${permissionPrefix}.delete`,
        handler:
          config.handlers?.delete || (() => context.deleteById?.()),
        visible: true,
      }),

      ...getItem("print", {
        ...menuItems.more,
        icon: "o_print",
        label: "print",
        permission: `${permissionPrefix}.print`,
        visible: true,
        subItems: [
          {
            ...menuItems.print,
            permission: `${permissionPrefix}.print`,
            handler:
              config.handlers?.print || (() => context.print?.()),
            visible: true,
            addSeparator: extraPrintItems?.length > 0,
          },
          ...(extraPrintItems?.map((fn) => fn(id)) || []),
          {
            ...menuItems.defaultItem,
            icon: "download",
            label: "downloadPdf",
            permission: `${permissionPrefix}.print`,
            handler:
              config.handlers?.downloadPdf ||
              (() => context.downloadPdf?.()),
          },
        ],
      }),

      ...getItem("sendMail", {
        ...menuItems.defaultItem,
        icon: "send",
        label: "sendMail",
        permission: `${permissionPrefix}.print`,
        handler:
          config.handlers?.sendMail || (() => context.sendMail?.()),
      }),

      // only if explicitly overridden
      ...(overrideItems.more ? getItem("more", []) : []),
    ];

    return menu;
  });
}
