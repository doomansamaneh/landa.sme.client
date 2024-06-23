import {
  title,
  isActive,
  actions,
  date,
  subject,
  rowNo,
  no,
  amount,
  customerName,
  itemNo,
  statusId,
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
    sortable: true,
    label: "بانک",
    style: "",
    showFilter: true,
    class: "text-left",
  },
  {
    name: "bankAccountTypeTitle",
    field: "bankAccountTypeTitle",
    sortable: true,
    label: "نوع حساب",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "no",
    field: "no",
    sortable: true,
    label: "شماره حساب",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "debitRemained",
    field: "debitRemained",
    sortable: true,
    label: "موجودی",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  { ...isActive },
  actions,
];

export const cashColumns = [
  { ...title },
  {
    name: "debitRemained",
    field: "debitRemained",
    sortable: true,
    label: "موجودی",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  { ...isActive },
  actions,
];

export const transferMoneyColumns = [
  { ...rowNo },
  { ...date },
  {
    name: "fromTitle",
    field: "fromTitle",
    sortable: true,
    label: "از",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "toTitle",
    field: "toTitle",
    sortable: true,
    label: "به",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  { ...subject },
  { ...amount },
  //actions,
];

export const receiptColumns = [
  { ...no },
  { ...date },
  { ...subject },
  { ...customerName },
  { ...amount },
  //actions,
];

export const billColumns = [
  { ...rowNo },
  { ...date },
  { ...subject },
  { ...amount },
  //actions,
];

export const checkItemColumns = [
  { ...no, name: "paymentNo", field: "paymentNo" },
  {
    ...date,
    name: "paymentDate",
    field: "paymentDate",
    template: "",
  },
  { ...itemNo },
  {
    ...date,
    name: "itemDate",
    field: "itemDate",
    template: "",
    label: "تاریخ چک",
  },
  { ...customerName },
  { ...subject },
  { ...amount },
  { ...statusId },
  //actions,
];
