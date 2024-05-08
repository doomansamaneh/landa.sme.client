import {
  code,
  title,
  voucherNo,
  slCode,
  slTitle,
  voucherDate,
  voucherSubject,
  comment,
  debitRemained,
  creditRemained,
  inlineDebit
} from "src/constants/columns";

export const customerAccountColumns = [
  code,
  title,
  {
    name: "debit",
    field: "debit",
    label: "بدهکار",
    style: "width:120px;",
    class: "text-left",
    sortable: true,
    showFilter: true,
  },
  {
    name: "credit",
    field: "credit",
    label: "بستانکار",
    style: "width:120px;",
    class: "text-left",
    sortable: true,
    showFilter: true,
  },
  {
    name: "debitRemained",
    field: "debitRemained",
    label: "مانده بدهکار",
    style: "width:120px;",
    class: "text-left",
    sortable: true,
    showFilter: true,
  },
  {
    name: "creditRemained",
    field: "creditRemained",
    label: "مانده بستانکار",
    style: "width:120px;",
    class: "text-left",
    sortable: true,
    showFilter: true,
  },
];

export const customerAccountDetailsColumns = [
  voucherNo, 
  slCode,
  slTitle,
  voucherDate,
  voucherSubject,
  comment,
  debitRemained,
  creditRemained,
  inlineDebit
];

