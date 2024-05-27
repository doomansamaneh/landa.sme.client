import {
  no,
  date,
  customerName,
  subject,
  amount,
  payedAmount,
  remainedAmount,
  discountAmount,
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

export const quoteColumns = [
  { ...no },
  { ...date },
  { ...customerName },
  { ...subject },
  { ...amount },
  { ...discountAmount },
  { ...statusId },
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
