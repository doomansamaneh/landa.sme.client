import {
  title,
  isActive,
  actions,
  date,
  subject,
  contractTitle,
  rowNo,
  no,
  amount,
  customerName,
  itemNo,
  statusId,
  debitRemained,
} from "src/constants/columns";

export const paymentInvoiceColumns = [
  { ...no },
  { ...date },
  { ...amount },
];

export const paymentItemColumns = [
  { ...no },
  { ...date },
  { ...subject },
];

export const bankAccountColumns = [
  {
    name: "bankTitle",
    field: "bankTitle",
    label: "bankTitle",
    sortable: true,
    style: "",
    showFilter: true,
    class: "text-left",
  },
  {
    name: "bankAccountTypeTitle",
    field: "bankAccountTypeTitle",
    label: "bankAccountTypeTitle",
    sortable: true,
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "no",
    field: "no",
    label: "no",
    sortable: true,
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    ...debitRemained,
    name: "debitRemained",
    class: "text-weight-600",
  },
  { ...isActive },
  actions,
];

export const cashColumns = [
  { ...title, name: "title" },
  {
    ...debitRemained,
    name: "debitRemained",
    class: "text-weight-600",
  },
  { ...isActive },
  actions,
];

export const transferMoneyColumns = [
  { ...rowNo, name: "rowNo" },
  { ...date, name: "date" },
  {
    name: "fromTitle",
    field: "fromTitle",
    label: "fromTitle",
    sortable: true,
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "toTitle",
    field: "toTitle",
    label: "toTitle",
    sortable: true,
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  { ...subject, name: "subject" },
  { ...amount, name: "amount", class: "text-weight-600" },
  //actions,
];

export const receiptColumns = [
  { ...no },
  { ...date },
  { ...subject },
  { ...contractTitle, hidden: true },
  { ...customerName },
  { ...amount, class: "text-weight-600" },
  //actions,
];

export const billColumns = [
  { ...rowNo },
  { ...date },
  { ...subject },
  { ...contractTitle, hidden: true },
  { ...amount, class: "text-weight-600" },
  //actions,
];

export const checkItemColumns = [
  { ...no, name: "paymentNo", field: "paymentNo" },
  {
    ...date,
    name: "paymentDate",
    field: "paymentDate",
  },
  { ...itemNo },
  {
    ...date,
    name: "itemDate",
    field: "itemDate",
  },
  { ...customerName },
  { ...subject },
  { ...amount, class: "text-weight-600" },
  { ...statusId, style: "width:240px;" },
  //actions,
];
