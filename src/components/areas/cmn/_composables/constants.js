import {
  code,
  title,
  typeId,
  parentTitle,
  isActive,
  actions,
} from "src/constants/columns";

export const productColumns = [
  {
    name: "productGroupTitle",
    field: "productGroupTitle",
    sortable: true,
    label: "productGroupTitle",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  { ...code },
  { ...title },
  { ...typeId },
  {
    name: "productUnitTitle",
    field: "productUnitTitle",
    sortable: true,
    label: "productUnitTitle",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "purchasePrice",
    field: "purchasePrice",
    sortable: true,
    label: "purchasePrice",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "price",
    field: "price",
    sortable: true,
    label: "price",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  { ...isActive },
  //actions,
];

export const bankBranchColumns = [
  {
    name: "bankTitle",
    field: "bankTitle",
    sortable: true,
    label: "bankTitle",
    class: "text-left",
    showFilter: true,
  },
  { ...code },
  { ...title },
  { ...isActive },
  actions,
];

export const productUnitRelationColumns = [
  {
    name: "masterUnitTitle",
    field: "masterUnitTitle",
    label: "masterUnitTitle",
    sortable: true,
    showFilter: true,
    class: "text-left",
  },
  {
    name: "detailUnitTitle",
    field: "detailUnitTitle",
    label: "detailUnitTitle",
    sortable: true,
    showFilter: true,
    class: "text-left",
  },
  {
    name: "rate",
    field: "rate",
    label: "rate",
    sortable: true,
    showFilter: false,
    class: "text-left",
    style: "width:150px",
  },
];

export const locationColumns = [
  { ...code },
  { ...title },
  { ...typeId },
  { ...parentTitle },
  { ...isActive },
];
