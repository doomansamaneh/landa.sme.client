import "src/helpers/extensions";
const dateTime = new Date();

export const voucherModel = {
  no: 1,
  date: dateTime.toDateString(),
  voucherItems: [],
};
