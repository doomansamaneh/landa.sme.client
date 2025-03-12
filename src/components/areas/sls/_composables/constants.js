import {
  no,
  productGroupCode,
  productGroupTitle,
  productCode,
  productTitle,
  productUnitTitle,
  vatAmount,
  currencyTitle,
  quantity,
  date,
  voucherNo,
  taxNo,
  nationalNo,
  provinceTitle,
  address,
  customerName,
  subject,
  price,
  itemComment,
  amount,
  payedAmount,
  remainedAmount,
  discountAmount,
  netAmount,
  statusId,
} from "src/constants/columns";

export const taxStatus = {
  success: "SUCCESS",
  pending: "PENDING",
  notFound: "NOT_FOUND",
  inProgress: "IN_PROGRESS",
  failed: "FAILED",
};

export const invoiceColumns = [
  { ...no },
  { ...date },
  { ...customerName },
  { ...subject },
  { ...amount },
  { ...payedAmount },
  { ...remainedAmount },
];

export const invoiceRemainedColumns = [
  { ...no },
  { ...date },
  { ...subject },
  { ...amount },
  { ...payedAmount },
  { ...remainedAmount, class: "text-weight-600" },
];

export const quoteColumns = [
  { ...no },
  { ...date },
  { ...customerName },
  { ...subject },
  { ...amount, class: "text-weight-600" },
  { ...discountAmount },
  { ...statusId },
];

export const reviewProductGroupColumns = [
  { ...productGroupCode },
  { ...productGroupTitle },
  { ...quantity, sortable: true },
  { ...amount, class: "text-weight-600" },
];

export const reviewProductColumns = [
  { ...productCode },
  { ...productTitle },
  { ...productUnitTitle },
  { ...price },
  { ...quantity, sortable: true },
  { ...amount, class: "text-weight-600" },
];

export const reviewCustomerColumns = [
  { ...customerName, style: "" },
  { ...quantity, sortable: true },
  { ...amount, class: "text-weight-600" },
];

export const reviewProductCustomerColumns = [
  { ...customerName, style: "" },
  { ...productCode },
  { ...productTitle },
  { ...price },
  { ...quantity, sortable: true },
  { ...amount, class: "text-weight-600" },
];

export const reviewInvoiceItemColumns = [
  { ...no },
  { ...date },
  { ...customerName },
  { ...productCode },
  { ...productTitle },
  //{ ...itemComment },
  { ...productUnitTitle },
  { ...price },
  { ...quantity },
  { ...vatAmount },
  { ...amount, class: "text-weight-600" },
];

export const taxReportColumns = [
  { ...no },
  { ...date },
  { ...voucherNo },
  { ...customerName },
  { ...amount },
  { ...discountAmount },
  { ...netAmount, class: "text-weight-600" },
  { ...vatAmount },
  { ...taxNo },
  { ...nationalNo },
  { ...provinceTitle },
  { ...address },
  { ...currencyTitle },
  { ...subject },
];

export const taxApiLogColumns = [
  {
    name: "logTime",
    field: "logTime",
    sortable: true,
    label: "زمان",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "status",
    field: "status",
    sortable: true,
    label: "وضعیت",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "actions",
    align: "left",
    class: "text-left",
    style: "width:5px",
  },
];
