import {
  no,
  date,
  subject,
  code,
  name,
  amount,
  discountAmount,
  statusId,
  isActive,
  typeId,
  title,
  jobTitle,
  unitTitle,
  payedAmount,
  remainedAmount,
} from "src/constants/columns";

export const customerColumns = [
  { ...typeId, template: "{{typeTitle}}" },
  { ...code },
  { ...name },
  { ...unitTitle, label: "واحد سازمانی" },
  { ...jobTitle },
  { ...isActive },
];

export const contactTypeColumns = [
  { ...typeId },
  { ...title },
  { ...isActive },
];

export const quoteColumns = [
  { ...no },
  { ...date },
  { ...subject },
  { ...amount },
  { ...discountAmount },
  { ...statusId },
];

export const invoiceColumns = [
  { ...no },
  { ...date },
  { ...subject },
  { ...amount },
  { ...payedAmount },
  { ...remainedAmount },
];
