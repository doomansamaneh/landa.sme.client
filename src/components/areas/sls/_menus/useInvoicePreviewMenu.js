import { menuItems } from "src/constants/menuItems";

export function useInvoicePreviewMenu(context) {
  return [
    {
      ...menuItems.edit,
      class: "primary-gradient primary-shadow text-white",
      permission: "sls.invoice.edit",
      route: `/sls/invoice/edit/${context.activeRow?.id}`,
      visible: true,
    },
    {
      ...menuItems.copy,
      permission: "sls.invoice.create",
      route: `/sls/invoice/copy/${context.activeRow?.id}`,
      visible: true,
    },
    {
      ...menuItems.delete,
      permission: "sls.invoice.delete",
      handler: () => context.deleteById?.(),
      visible: true,
    },
    {
      ...menuItems.more,
      icon: "o_print",
      label: "print",
      permission: "sls.invoice.print",
      visible: true,
      subItems: [
        {
          ...menuItems.print,
          permission: "sls.invoice.print",
          handler: () => context.print?.(),
          visible: true,
          addSeparator: true,
        },
        {
          ...menuItems.print,
          label: "printAddress",
          permission: "sls.invoice.print",
          route: `/sls/invoice/addressPreview/${context.activeRow?.id}`,
          visible: true,
        },
        {
          ...menuItems.print,
          label: "printInventoryExit",
          permission: "sls.invoice.print",
          route: `/sls/invoice/exitPreview/${context.activeRow?.id}`,
          visible: true,
          addSeparator: true,
        },
        {
          ...menuItems.defaultItem,
          icon: "download",
          label: "downloadPdf",
          permission: "sls.invoice.print",
          handler: () => context.downloadPdf?.(),
        },
        // <menu-item
        //   v-if="$route.path.includes('sls/purchase/preview')"
        //   :to="`/${baseRoute}/ReceiptPreview/${model.id}`"
        //   icon="o_print"
        //   title="چاپ رسید انبار"
        // />
      ],
    },

    {
      ...menuItems.defaultItem,
      icon: "send",
      label: "sendMail",
      permission: "sls.invoice.print",
      handler: () => context.sendMail?.(),
    },
  ];
}
