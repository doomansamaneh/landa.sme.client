import { menuItems } from "src/constants/menuItems";

export function usePreviewMenu(context, config) {
  const id = context.model?.id;
  const permissionPrefix = config.permissionPrefix;

  return [
    {
      ...menuItems.edit,
      class: "primary-gradient primary-shadow text-white",
      permission: `${permissionPrefix}.edit`,
      route:
        config.routes?.edit?.(id) ||
        `/${context.baseRoute}/edit/${id}`,
      visible: true,
    },
    {
      ...menuItems.copy,
      permission: `${permissionPrefix}.clone`,
      route:
        config.routes?.copy?.(id) ||
        `/${context.baseRoute}/copy/${id}`,
      visible: true,
    },
    {
      ...menuItems.delete,
      permission: `${permissionPrefix}.delete`,
      handler:
        config.handlers?.delete || (() => context.deleteById?.()),
      visible: true,
    },
    {
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
          addSeparator: config.extraPrintItems?.length > 0,
        },
        ...(config.extraPrintItems?.map((fn) => fn(id)) || []),
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
    },
    {
      ...menuItems.defaultItem,
      icon: "send",
      label: "sendMail",
      permission: `${permissionPrefix}.print`,
      handler:
        config.handlers?.sendMail || (() => context.sendMail?.()),
    },
  ];
}
