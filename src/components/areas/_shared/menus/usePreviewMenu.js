import { computed } from "vue";
import { useQuasar } from "quasar";
import { menuItems } from "src/constants/menuItems";

export function usePreviewMenu(context, config = {}) {
  const $q = useQuasar();
  const {
    permissionPrefix = "",
    extraPrintItems = [],
    overrideItems = {},
    exclude = [],
    routes = {},
    handlers = {},
  } = config;

  const getItem = (key, fallbackItem) => {
    if (exclude.includes(key)) return [];
    const override = overrideItems[key];
    if (override == null) return [fallbackItem];
    return Array.isArray(override) ? override : [override];
  };

  const getMoreItem = () => {
    const key = "more";
    if (exclude.includes(key)) return [];

    const override = overrideItems[key];
    if (Array.isArray(override)) return override;

    return [
      {
        ...override,
      },
    ];
  };

  const id = context.model?.id ?? context.id;

  return computed(() => {
    const menu = [
      ...getItem("edit", {
        ...menuItems.edit,
        class: "primary-gradient primary-shadow text-white",
        permission: `${permissionPrefix}.edit`,
        route:
          routes.edit?.(id) ?? `/${context.baseRoute}/edit/${id}`,
        visible: true,
      }),

      ...getItem("copy", {
        ...menuItems.copy,
        permission: `${permissionPrefix}.clone`,
        route:
          routes.copy?.(id) ?? `/${context.baseRoute}/copy/${id}`,
        visible: true,
      }),

      ...getItem("delete", {
        ...menuItems.delete,
        permission: `${permissionPrefix}.delete`,
        handler: handlers.delete ?? (() => context.deleteById?.()),
        visible: true,
      }),

      // On mobile, show only PDF download directly, on desktop show full print menu
      ...($q.screen.lt.md
        ? getItem("printPdf", {
            ...menuItems.print,
            icon: "download",
            label: "downloadPdf",
            permission: `${permissionPrefix}.print`,
            visible: true,
            handler:
              handlers.downloadPdf ?? (() => context.downloadPdf?.()),
          })
        : getItem("print", {
            ...menuItems.more,
            icon: "o_print",
            label: "print",
            permission: `${permissionPrefix}.print`,
            visible: true,
            subItems: [
              ...getItem("printMain", {
                ...menuItems.print,
                permission: `${permissionPrefix}.print`,
                handler: handlers.print ?? (() => context.print?.()),
                visible: true,
                addSeparator: extraPrintItems?.length > 0,
              }),
              ...(extraPrintItems?.map((fn) => fn(id)) ?? []),
              ...getItem("printPdf", {
                ...menuItems.print,
                icon: "download",
                label: "downloadPdf",
                permission: `${permissionPrefix}.print`,
                visible: true,
                handler:
                  handlers.downloadPdf ??
                  (() => context.downloadPdf?.()),
              }),
            ],
          })),

      ...getItem("sendMail", {
        ...menuItems.defaultItem,
        icon: "send",
        label: "sendMail",
        permission: `${permissionPrefix}.print`,
        handler: handlers.sendMail ?? (() => context.sendMail?.()),
        visible: true,
      }),

      ...getMoreItem(),
    ];

    return menu;
  });
}
