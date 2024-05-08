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
} from "src/constants/columns";

export const productStockColumns = [
    code,
    title,
    unitTitle,
    purchaseQuantity,
    salesQuantity,
    stock,
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
  