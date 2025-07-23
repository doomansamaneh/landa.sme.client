import {
  code,
  title,
  isActive,
  actions,
} from "src/constants/columns";
export const unitColumns = [
  code,
  title,
  {
    name: "unitTypeTitle",
    field: "unitTypeTitle",
    sortable: true,
    label: "typeId",
    showFilter: true,
    class: "text-left",
  },
  {
    name: "locationTitle",
    field: "locationTitle",
    sortable: true,
    label: "locationTitle",
    style: "",
    showFilter: true,
    class: "text-left",
  },
  isActive,
  actions,
];
