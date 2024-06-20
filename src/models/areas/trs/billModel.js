import { subject } from "src/constants/columns";
import "src/helpers/extensions";
const dateTime = new Date();

export const billModel = {
  no: 1,
  date: dateTime.toDateString(),
  paymentItems: [],
  billItems: [],
};
