import { menuItemType } from "./enums";

const defaultItem = {
  type: menuItemType.item,
  visible: true,
};

export const menuItems = {
  defaultItem,
  create: {
    ...defaultItem,
    label: "create",
    icon: "o_add",
    class: "primary-gradient text-white primary-shadow",
    addSeparator: true,
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
    addSeparator: true,
  },

  refresh: {
    ...defaultItem,
    label: "refresh",
    icon: "o_refresh",
  },

  more: {
    type: menuItemType.moreItem,
    label: "more",
    icon: "more_horiz",
    visible: true,
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
