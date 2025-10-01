import {
  date,
  subject,
  code,
  title,
  unitTitle,
  purchaseQuantity,
  salesQuantity,
  stock,
  debit,
  voucherNo,
  inlineQuantity,
  price,
  rowNo,
  amount,
  inventoryTitle,
  contractTitle,
  toInventoryTitle,
  dlCode,
  openingPrice,
  openingQuantity,
  openingTotalPrice,
  inQuantity,
  inPrice,
  totalPrice,
  inTotalPrice,
  outQuantity,
  outPrice,
  outTotalPrice,
  cogs,
  closingQuantity,
  productCode,
  productTitle,
} from "src/constants/columns";

export const productStockColumns = [
  code,
  dlCode,
  title,
  { ...unitTitle, label: "productUnitTitle" },
  { ...purchaseQuantity, label: "inQuantity" },
  { ...salesQuantity, label: "outQuantity" },
  { ...stock, class: "text-weight-600", sortable: true },
  { ...debit, label: "inventoryValue" },
];

export const productGroupStockColumns = [
  code,
  title,
  { ...purchaseQuantity, label: "inQuantity" },
  { ...salesQuantity, label: "outQuantity" },
  { ...stock, class: "text-weight-600", sortable: true },
  { ...debit, label: "inventoryValue" },
];

export const productFlowColumns = [
  code,
  dlCode,
  title,
  //unitTitle,
  openingQuantity,
  openingPrice,
  openingTotalPrice,
  inQuantity,
  inPrice,
  inTotalPrice,
  outQuantity,
  outPrice,
  outTotalPrice,
  cogs,
  closingQuantity,
];

export const productStockItemColumns = [
  productCode,
  productTitle,
  voucherNo,
  date,
  subject,
  // summary,
  { ...purchaseQuantity, label: "inQuantity", showFilter: false },
  { ...salesQuantity, label: "outQuantity", showFilter: false },
  inlineQuantity,
  { ...price, label: "unitPrice", showFilter: false },
  { ...totalPrice },
];

export const closeOrderColumns = [
  { ...rowNo },
  { ...date },
  { ...contractTitle },
  { ...inventoryTitle },
  { ...subject },
  { ...amount },
];

export const repositionColumns = [
  { ...rowNo },
  { ...date },
  { ...inventoryTitle },
  { ...toInventoryTitle },
  { ...subject },
  { ...amount },
];

export const openingStockColumns = [
  { ...rowNo },
  { ...date },
  { ...inventoryTitle },
  { ...subject },
  { ...amount },
];
