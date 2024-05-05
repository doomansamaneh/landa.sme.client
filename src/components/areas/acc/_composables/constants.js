import {
  rowNo,
  id,
  no,
  code,
  date,
  subject,
  type,
  title,
  isActive,
  amount,
  actions,
} from "src/constants/columns";

export const accountGLColumns = [
  code,
  {
    name: "clTitle",
    field: "clTitle",
    sortable: true,
    label: "گروه حساب",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  title,
  isActive,
  actions,
];

export const accountSLColumns = [
  code,
  {
    name: "clTitle",
    field: "clTitle",
    sortable: true,
    label: "گروه حساب",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "glTitle",
    field: "glTitle",
    sortable: true,
    label: "حساب کل",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  title,
  isActive,
  actions,
];

export const accountDLColumns = [
  code,
  title,
  {
    name: "debitRemained",
    field: "debitRemained",
    label: "مانده بدهکار",
    style: "width:120px;",
    class: "text-left",
  },
  {
    name: "creditRemained",
    field: "creditRemained",
    label: "مانده بستانکار",
    style: "width:120px;",
    class: "text-left",
  },
  type,
  isActive,
  actions,
];

export const voucherColumns = [
  rowNo,
  no,
  date,
  subject,
  amount,
  type,
  {
    name: "systemId",
    field: "systemId",
    sortable: true,
    label: "سیستم",
    align: "left",
    class: "text-left",
    style: "width:160px;",
    showFilter: true,
  },
];

export const accountCLColumns = [
  id,
  code,
  title,
  isActive,
];