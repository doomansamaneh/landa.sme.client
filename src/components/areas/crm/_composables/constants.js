import { code, isActive } from "src/constants/columns";
import { sqlOperator } from "src/constants";

export const customerColumns = [
  {
    name: "typeId",
    field: "typeId",
    template: "{{typeTitle}}",
    sortable: true,
    label: "نوع",
    class: "text-left",
    cellClass: "text-left",
    cellStyle: "",
    style: "width:120px;",
    showFilter: true,
    operator: sqlOperator.equal,
    value: "",
  },
  code,
  {
    name: "name",
    field: "name",
    sortable: true,
    label: "نام",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "unitTitle",
    field: "unitTitle",
    sortable: true,
    label: "واحد",
    align: "left",
    class: "text-left",
    showFilter: true,
  },
  {
    name: "jobTitle",
    field: "jobTitle",
    sortable: true,
    label: "شغل",
    align: "left",
    class: "text-left",
    showFilter: true,
  },
  isActive,
];
