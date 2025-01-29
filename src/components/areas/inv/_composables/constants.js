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

export const productStockItemColumns = [
  voucherNo,
  date,
  subject,
  // summary,
  purchaseQuantity,
  salesQuantity,
  inlineQuantity,
  price,
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
