import { code, title, isActive, actions } from "src/constants/columns";
export const unitColumns = [
  code,
  title,
  {
    name: "unitTypeTitle",
    field: "unitTypeTitle",
    sortable: true,
    label: "نوع",
    showFilter: true,
    class: "text-left",
  },
  {
    name: "locationTitle",
    field: "locationTitle",
    sortable: true,
    label: "محل جغرافیایی",
    style: "",
    showFilter: true,
    class: "text-left",
  },
  isActive,
  actions,
];
