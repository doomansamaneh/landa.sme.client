import { menuItemType } from "./enums";

export const menuItems = {
  create: {
    type: menuItemType.item,
    label: "create",
    icon: "o_add",
    class: "primary-gradient text-white primary-shadow",
    visible: true,
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
    type: menuItemType.item,
    label: "refresh",
    icon: "o_refresh",
    visible: true,
  },

  print: {
    type: menuItemType.item,
    label: "print",
    icon: "o_print",
  },

  printBatch: {
    type: menuItemType.item,
    label: "printBatch",
    icon: "o_print",
    visible: true,
  },

  exportExcel: {
    type: menuItemType.item,
    label: "exportExcel",
    icon: "o_download",
    visible: true,
  },

  exportExcelCurrentPage: {
    type: menuItemType.item,
    label: "exportExcelCurrentPage",
    icon: "o_download",
    visible: true,
  },
};
