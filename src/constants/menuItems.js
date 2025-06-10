import { menuItemType } from "./enums";

export const menuItems = {
  defaultItem: {
    type: menuItemType.item,
    visible: true,
  },
  create: {
    ...defaultItem,
    label: "create",
    icon: "o_add",
    class: "primary-gradient text-white primary-shadow",
  },

  edit: {
    type: menuItemType.item,
    label: "edit",
    icon: "o_edit",
  },

  copy: {
    type: menuItemType.item,
    label: "copy",
    icon: "o_content_copy",
  },

  delete: {
    type: menuItemType.item,
    label: "delete",
    icon: "o_delete",
  },

  separator: {
    type: menuItemType.separator,
    label: "separator",
    visible: true,
  },

  refresh: {
    ...defaultItem,
    label: "refresh",
    icon: "o_refresh",
  },

  print: {
    type: menuItemType.item,
    label: "print",
    icon: "o_print",
  },

  printBatch: {
    ...defaultItem,
    label: "printBatch",
    icon: "o_print",
  },

  exportExcel: {
    ...defaultItem,
    label: "exportExcel",
    icon: "o_download",
  },

  exportExcelCurrentPage: {
    ...defaultItem,
    label: "exportExcelCurrentPage",
    icon: "o_download",
  },
};
