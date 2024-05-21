import { title, isActive, actions } from "src/constants/columns";
export const contractColumns = [
  {
    name: "no",
    field: "no",
    sortable: true,
    label: "شماره",
    style: "",
    showFilter: true,
    class: "text-left",
    style: "width:150px;",
  },
  title,
  {
    name: "startDate",
    field: "startDate",
    sortable: true,
    label: "تاریخ شروع",
    style: "",
    class: "text-left",
  },
  {
    name: "finishDate",
    field: "finishDate",
    sortable: true,
    label: "تاریخ پایان",
    style: "",
    class: "text-left",
  },
  {
    name: "income",
    field: "income",
    sortable: true,
    label: "درآمد",
    style: "",
    class: "text-left",
  },
  {
    name: "expense",
    field: "expense",
    sortable: true,
    label: "هزینه",
    style: "",
    class: "text-left",
  },
  {
    name: "netIncome",
    field: "netIncome",
    label: "درآمد خالص",
    style: "",
    class: "text-left",
  },
  isActive,
  //actions,
];
