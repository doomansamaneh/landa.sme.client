import {
  code,
  name,
  isActive,
  typeId,
  title,
  jobTitle,
  unitTitle,
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
