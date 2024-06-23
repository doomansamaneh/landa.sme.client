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
    label: "گروه کالا",
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
    label: "واحد سنجش",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "purchasePrice",
    field: "purchasePrice",
    sortable: true,
    label: "قیمت خرید",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "price",
    field: "price",
    sortable: true,
    label: "قیمت فروش",
    style: "",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  { ...isActive },
  actions,
];

export const bankBranchColumns = [
  {
    name: "bankTitle",
    field: "bankTitle",
    sortable: true,
    label: "بانک",
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
    label: "واحد سنجش اصلی",
    sortable: true,
    showFilter: true,
    class: "text-left",
  },
  {
    name: "detailUnitTitle",
    field: "detailUnitTitle",
    label: "واحد سنجش فرعی",
    sortable: true,
    showFilter: true,
    class: "text-left",
  },
  {
    name: "rate",
    field: "rate",
    label: "نرخ",
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
