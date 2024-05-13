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
  debit,
  credit,
  debitRemained,
  creditRemained,
  inlineDebit,
  voucherNo,
  slCode,
  slTitle,
  voucherDate,
  voucherSubject,
  comment,
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
  debitRemained,
  creditRemained,
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

export const accountCLColumns = [id, code, title, isActive];

export const customerAccountColumns = [
  code,
  title,
  debit,
  credit,
  debitRemained,
  creditRemained,
];

export const debtorColumns = [
  code,
  title,
  debit,
  credit,
  debitRemained,
];

export const creditorColumns = [
  code,
  title,
  debit,
  credit,
  creditRemained,
];

export const customerAccountItemColumns = [
  voucherNo,
  voucherDate,
  slCode,
  slTitle,
  voucherSubject,
  // comment,
  { ...debitRemained, label: "بدهکار" },
  { ...creditRemained, label: "بستانکار" },
  inlineDebit,
];

export const journalBookColumns = [
  voucherNo,
  voucherDate,
  code,
  title,
  subject,
  debit,
  credit,
];
