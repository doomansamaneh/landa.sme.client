import { sqlOperator } from "src/constants";

export const invoiceColumns = [
  {
    name: "no",
    field: "no",
    sortable: true,
    label: "شماره",
    class: "text-left",
    cellClass: "text-left",
    cellStyle: "",
    style: "width:100px;",
    showFilter: true,
    operator: sqlOperator.equal,
    value: "",
  },
  {
    name: "date",
    field: "date",
    template: "{{dateString}}",
    sortable: true,
    label: "تاریخ",
    class: "text-left",
    style: "width:120px",
    showFilter: true,
  },
  {
    name: "customerName",
    field: "customerName",
    sortable: true,
    label: "مشتری",
    style: "",
    template: "{{customerCode}} {{customerName}}",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "subject",
    field: "subject",
    sortable: true,
    label: "شرح",
    align: "left",
    class: "text-left",
    showFilter: true,
  },
  {
    name: "amount",
    field: "amount",
    sortable: true,
    label: "جمع کل",
    align: "left",
    class: "text-left",
    showFilter: true,
    style: "width:120px",
  },
  {
    name: "payedAmount",
    field: "payedAmount",
    sortable: true,
    label: "دریافت شده",
    align: "left",
    class: "text-left",
    style: "width:120px",
    showFilter: true,
  },
  {
    name: "remainedAmount",
    field: "remainedAmount",
    sortable: true,
    label: "مانده",
    align: "left",
    class: "text-left",
    style: "width:120px",
    showFilter: true,
  },
];
