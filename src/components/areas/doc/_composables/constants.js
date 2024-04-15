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
  actions,
];
