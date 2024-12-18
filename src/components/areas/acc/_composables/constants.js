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
  dlCode,
  dlTitle,
  voucherDate,
  voucherSubject,
  comment,
} from "src/constants/columns";

export const accountGLColumns = [
  { ...code },
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
  { ...title },
  { ...isActive },
  { ...actions },
];

export const accountSLColumns = [
  { ...code },
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
  { ...title },
  { ...isActive },
  { ...actions },
];

export const accountDLColumns = [
  { ...code },
  { ...title },
  { ...debitRemained },
  { ...creditRemained },
  { ...type },
  { ...isActive },
  { ...actions },
];

export const voucherColumns = [
  { ...rowNo },
  { ...no },
  { ...date },
  { ...subject },
  { ...type },
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
  { ...amount },
];

export const accountCLColumns = [
  { ...id },
  { ...code },
  { ...title },
  { ...isActive },
];

export const customerAccountColumns = [
  { ...code },
  { ...title },
  { ...debit },
  { ...credit },
  { ...debitRemained },
  { ...creditRemained },
];

export const debtorColumns = [
  { ...code },
  { ...title },
  { ...debit },
  { ...credit },
  { ...debitRemained },
];

export const creditorColumns = [
  { ...code },
  { ...title },
  { ...debit },
  { ...credit },
  { ...creditRemained },
];

export const accountItemColumns = [
  { ...voucherNo },
  { ...voucherDate },
  { ...slCode },
  { ...slTitle },
  { ...dlCode },
  { ...dlTitle },
  { ...voucherSubject },
  { ...debitRemained, label: "بدهکار", showFilter: true },
  { ...creditRemained, label: "بستانکار", showFilter: true },
  { ...inlineDebit },
];

export const accountItemDLColumns = [
  { ...voucherNo },
  { ...voucherDate },
  { ...slCode },
  { ...slTitle },
  { ...voucherSubject },
  { ...debitRemained, label: "بدهکار", showFilter: true },
  { ...creditRemained, label: "بستانکار", showFilter: true },
  { ...inlineDebit },
];

export const accountItemSLColumns = [
  { ...voucherNo },
  { ...voucherDate },
  { ...dlCode },
  { ...dlTitle },
  { ...voucherSubject },
  { ...debitRemained, label: "بدهکار" },
  { ...creditRemained, label: "بستانکار" },
];

export const reviewCLColumns = [
  { ...code },
  { ...title },
  { ...debit, showFilter: true },
  { ...credit, showFilter: true },
  { ...debitRemained, showFilter: true },
  { ...creditRemained, showFilter: true },
];

export const reviewGLColumns = [...reviewCLColumns];
export const reviewSLColumns = [...reviewCLColumns];
export const reviewDLColumns = [
  { ...code },
  { ...title },
  { ...type },
  { ...debit, showFilter: true },
  { ...credit, showFilter: true },
  { ...debitRemained, showFilter: true },
  { ...creditRemained, showFilter: true },
];

export const journalBookColumns = [
  { ...voucherNo, sortable: false },
  { ...voucherDate, sortable: false },
  { ...code, sortable: false },
  { ...title, sortable: false },
  { ...subject, sortable: false },
  { ...debit, sortable: false },
  { ...credit, sortable: false },
];

export const journalBookTotalColumns = [
  { ...month, sortable: false, showFilter: false },
  { ...code, sortable: false },
  { ...title, sortable: false },
  { ...debit, sortable: false },
  { ...credit, sortable: false },
];
