import "src/helpers/extensions";
const dateTime = new Date();

export const receiptModel = {
  no: 1,
  date: dateTime.toDateString(),
  paymentItems: [],
  remainedInvoices: [],
};
