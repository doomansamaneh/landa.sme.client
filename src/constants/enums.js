export const statusOptions = [
  {
    label: "دائم",
    value: "1",
  },
  {
    label: "موقت",
    value: "2",
  },
  {
    label: "ابطال شده",
    value: "3",
  },
];

export const isActiveOptions = [
  {
    label: "فعال",
    value: "1",
  },
  {
    label: "غیرفعال",
    value: "0",
  },
];

export const customerType = {
  legal: 171,
  person: 172,
  personnel: 173,
};

export const militaryStatus = {
  done: 131,
  exempt: 132,
  illnessExemption: 133,
  educationalExepmtion: 134,
  temporalExemption: 135,
};

export const marriageStatus = {
  single: 121,
  married: 122,
  divorced: 123,
};

export const precisionCounts = [
  {
    label: "0",
    value: 0,
  },
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
];

export const vatType = {
  purchaseAndSale: 2,
  sale: 1,
  purchase: 0,
};

export const gender = {
  male: 101,
  female: 102,
};

export const customerRole = {
  customer: 301,
  supplier: 302,
  marketer: 303,
  shareHolder: 304,
  personnel: 305,
};

export const dateRange = {
  // all: 0,
  // today: 2,
  // thisWeek: 3,
  // thisMonth: 4
  all: 0,
  today: "today",
  thisWeek: "thisWeek",
  thisMonth: "thisMonth",
};

export const sqlOperator = {
  equal: 1,
  notEqual: 2,
  like: 3,
  notLike: 4,
  lessThan: 5,
  lessThanOrEqual: 6,
  greaterThan: 7,
  greaterThanOrEqual: 8,
  in: 9,
  notIn: 10,
  startWith: 11,
  isNull: 12,
  isNotNull: 13,
};

export const sortOrder = {
  ascending: 1,
  descending: 2,
};

export const productType = {
  main: 211,
  part: 212,
  useable: 213,
  service: 214,
};

export const cultures = [
  { name: "فارسی", iso: "fa-IR", calendar: "persian", bodyClass: "persian" },
  {
    name: "English",
    iso: "en-US",
    calendar: "gregorian",
    bodyClass: "english",
  },
  { name: "عربى", iso: "ar", calendar: "hijri", bodyClass: "arabic" },
];

// export const cultures_ = [
//   {
//     iso: "fa-IR",
//     code: "fa-IR",
//     name: "فارسی",
//     calendar: "persian",
//     dir: "rtl",
//     flag: "",
//   },
//   {
//     iso: "ar",
//     code: "ar",
//     name: "العربیة",
//     calendar: "hijri",
//     dir: "rtl",
//     flag: "",
//   },
//   {
//     iso: "en-Us",
//     code: "en",
//     name: "English",
//     calendar: "gregorian",
//     dir: "ltr",
//     flag: "",
//   },
// ];

export const defaultPageSize = 10; //10

export const defaultLookupPageSize = 10;

export const dataViewDefaultPageSize = 5;

export const guidEmpty = "00000000-0000-0000-0000-000000000000";

export const cancelStatus = "a36af633-d0bb-4857-a542-364e12658d1c";
