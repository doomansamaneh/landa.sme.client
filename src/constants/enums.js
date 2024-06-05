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
  {
    label: "3",
    value: 3,
  },
  {
    label: "4",
    value: 4,
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

export const invoiceFormType = {
  sales: 1,
  purchase: 2,
};

export const transferMoneyType = {
  bankAccount: 1,
  cash: 2,
};

export const voucherType = {
  general: 1041,
  closeInterimAccount: 1043,
  openingVoucher: 1044,
  closingVoucher: 1045,
  modificationVoucher: 1046,
};

export const subSystem = {
  accounting: 51,
  receiptAndPayment: 52,
  sales: 53,
  afterSalesService: 54,
  payroll: 55,
  asset: 56,
  inventory: 57,
  contract: 58,
};

export const paymentMethod = {
  cash: { id: 1071, color: "blue" },
  bankTransition: { id: 1073, color: "green" },
  check: { id: 1072, color: "red" },
  //pos: { id: 1074, color: "orange" },
  customer: { id: 1075, color: "black" },
};

export const productType = {
  main: 211,
  part: 212,
  useable: 213,
  service: 214,
};

export const accountDLType = {
  customer: 1032,
  personnel: 1033,
  cash: 1034,
  bankAccount: 1035,
  costCenter: 1036,
  product: 1039,
  other: 1031,
};

export const closeAccounts = {
  revenue: "d562f27e-9af0-4e14-9e31-0d11c577e556",
  expense: "5f4ae9d2-eeca-4ce6-a469-18db06d70dff",
  cogs: "33422e29-2694-4d91-abd7-90303c0e1966",
};

export const quoteStatus = {
  temp: "e84d4f06-29ea-4131-b78e-e36302d37e7c",
  final: "c84e9c9d-31e6-4f45-9a6d-265d825e3d4c",
};

export const paymentType = {
  cash: 1,
  trust: 2,
  both: 3,
};

export const accountType = {
  debit: 1021,
  credit: 1022,
  debitCredit: 1023,
};

export const taxApiInvoiceType = {
  b2B: 1,
  b2C: 2,
  posOnline: 3,
};

export const taxApiInvoicePattern = {
  sales: 1,
  currencySales: 2,
  goldAndGem: 3,
  contract: 4,
  generalService: 5,
  airplaneTicket: 6,
};

export const cogsCalcMethod = {
  none: 0,
  fifo: 1,
};

export const invoicePreviewTemplate = {
  standard: 0,
  simple: 1,
};

export const cultures = [
  {
    name: "فارسی",
    iso: "fa-IR",
    calendar: "persian",
    bodyClass: "persian",
  },
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

export const accountCurrentAsset =
  "A0E42E83-83B3-4197-A27F-BED2B904D5A6";
export const accountFixedAsset =
  "DCA8E9B3-ED6F-4585-8B6B-8B5D84AB25FE";
export const accountCurrentLiability =
  "39A38D45-00FA-4434-BF6E-0BAF45DC51C3";
export const accountLongTermLiability =
  "99B941D5-A416-4298-8572-E7216A07DAFE";
export const accountEquity = "C7B540DA-1C4F-445A-A730-E5738D4C6CA8";
export const accountRevenue = "D562F27E-9AF0-4E14-9E31-0D11C577E556";
export const accountCGS = "33422E29-2694-4D91-ABD7-90303C0E1966";
export const accountExpense = "5F4AE9D2-EECA-4CE6-A469-18DB06D70DFF";
export const accountCntra = "2926F151-1A55-476D-9025-57E0CAEA8561";
