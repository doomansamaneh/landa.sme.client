import "src/helpers/extensions";
const dateTime = new Date();

export const invoiceModel = {
  no: 1,
  date: dateTime.toDateString(),
  invoiceItems: [],
};

export const invoiceBatchModel = {
  invoiceType: {
    fieldName: "TypeId",
    isModified: false,
  },
  contract: {
    fieldName: "ContractId",
    isModified: false,
  },
  customer: {
    fieldName: "CustomerId",
    isModified: false,
  },
};
