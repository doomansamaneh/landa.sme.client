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
  inTotalPrice,
  outQuantity,
  outPrice,
  outTotalPrice,
  cogs,
  closingQuantity,
} from "src/constants/columns";

export const productStockColumns = [
  code,
  dlCode,
  title,
  unitTitle,
  purchaseQuantity,
  salesQuantity,
  { ...stock, class: "text-weight-600" },
  debit,
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
  voucherNo,
  date,
  subject,
  // summary,
  purchaseQuantity,
  salesQuantity,
  inlineQuantity,
  { ...price, label: "فی", showFilter: false },
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
