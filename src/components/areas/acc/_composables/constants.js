import { comment } from "postcss";
import {
  rowNo,
  id,
  no,
  code,
  month,
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
  clCode,
  clTitle,
  slCode,
  slTitle,
  dlCode,
  dlTitle,
  voucherDate,
  voucherSubject,
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
  { ...debitRemained, class: "text-weight-700" },
  { ...creditRemained, class: "text-weight-700" },
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
  { ...debitRemained, sortable: true, class: "text-weight-600" },
  { ...creditRemained, sortable: true, class: "text-weight-600" },
];

export const debtorColumns = [
  { ...code },
  { ...title },
  { ...debit },
  { ...credit },
  { ...debitRemained, class: "text-weight-600" },
];

export const creditorColumns = [
  { ...code },
  { ...title },
  { ...debit },
  { ...credit },
  { ...creditRemained, class: "text-weight-600" },
];

export const accountItemColumns = [
  { ...voucherNo },
  { ...voucherDate },
  { ...slCode },
  { ...slTitle },
  { ...dlCode },
  { ...dlTitle },
  { ...voucherSubject },
  {
    ...debitRemained,
    label: "بدهکار",
    showFilter: true,
    sortable: true,
  },
  {
    ...creditRemained,
    label: "بستانکار",
    showFilter: true,
    sortable: true,
  },
  { ...inlineDebit },
];

export const journalBookTaxColumns = [
  { ...voucherNo, label: "شماره سند" },
  { ...clCode, label: "کد حساب کل" },
  { ...clTitle, label: "عنوان حساب کل" },
  { ...slCode, label: "کد حساب معین" },
  { ...slTitle, label: "عنوان حساب معین" },
  //{ ...dlCode, label: "کد حساب تفصیلی" },
  //{ ...dlTitle, label: "عنوان حساب تفصیلی" },
  {
    ...debitRemained,
    label: "مبلغ بدهکار (ریال)",
    //format: (val) => val / 1_000_000,
  },
  {
    ...creditRemained,
    label: "مبلغ بستانکار (ریال)",
    //format: (val) => val / 1_000_000,
  },
  { ...voucherDate, label: "تاریخ سند", showFilter: false },
  { ...voucherSubject, label: "شرح سند", showFilter: false },
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
  { ...debit, showFilter: true, sortable: true },
  { ...credit, showFilter: true, sortable: true },
  { ...debitRemained, showFilter: true, sortable: true },
  { ...creditRemained, showFilter: true, sortable: true },
];

export const reviewGLColumns = [...reviewCLColumns];
export const reviewSLColumns = [...reviewCLColumns];
export const reviewDLColumns = [
  { ...code },
  { ...title },
  { ...type },
  { ...debit, showFilter: true, sortable: true },
  { ...credit, showFilter: true, sortable: true },
  { ...debitRemained, showFilter: true, sortable: true },
  { ...creditRemained, showFilter: true, sortable: true },
];
export const reviewSLDLColumns = [
  { ...slCode },
  { ...slTitle },
  { ...dlCode },
  { ...dlTitle },
  { ...type },
  { ...debit, showFilter: true, sortable: true },
  { ...credit, showFilter: true, sortable: true },
  { ...debitRemained, showFilter: true, sortable: true },
  { ...creditRemained, showFilter: true, sortable: true },
];

export const journalBookColumns = [
  { ...voucherNo, sortable: false },
  { ...voucherDate, sortable: false },
  { ...code, sortable: false },
  { ...title, sortable: false },
  { ...subject, sortable: false },
  { ...debit, sortable: false, class: "text-weight-600" },
  { ...credit, sortable: false, class: "text-weight-600" },
];

export const journalBookTotalColumns = [
  { ...month, sortable: false, showFilter: false },
  { ...code, sortable: false },
  { ...title, sortable: false },
  { ...debit, sortable: false, class: "text-weight-600" },
  { ...credit, sortable: false, class: "text-weight-600" },
];
