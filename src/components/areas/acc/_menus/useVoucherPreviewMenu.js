import { menuItems } from "src/constants/menuItems";

export function useVoucherPreviewMenu(context) {
  return [
    {
      ...menuItems.edit,
      class: "primary-gradient primary-shadow text-white",
      permission: "acc.voucher.edit",
      route: `/acc/voucher/edit/${context.activeRow?.id}`,
      visible: true,
    },
    {
      ...menuItems.copy,
      permission: "acc.voucher.create",
      route: `/acc/voucher/copy/${context.activeRow?.id}`,
      visible: true,
    },
    {
      ...menuItems.delete,
      permission: "acc.voucher.delete",
      handler: () => context.deleteById?.(),
      visible: true,
    },
    {
      ...menuItems.print,
      permission: "acc.voucher.print",
      handler: () => context.print?.(),
      visible: true,
    },
    {
      ...menuItems.defaultItem,
      icon: "download",
      label: "downloadPdf",
      permission: "acc.voucher.print",
      handler: () => context.downloadPdf?.(),
    },
    {
      ...menuItems.defaultItem,
      icon: "send",
      label: "sendMail",
      permission: "acc.voucher.print",
      handler: () => context.sendMail?.(),
    },
  ];
}
