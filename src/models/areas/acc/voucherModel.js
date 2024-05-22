import { dateRange } from "src/constants";
import "src/helpers/extensions";
const dateTime = new Date();

export const voucherModel = {
  no: 1,
  date: dateTime.toDateString(),
  voucherItems: [],
};

export const voucherSearchModel = {
  dateRange: dateRange.all,
  voucherTypeIds: [],
};
