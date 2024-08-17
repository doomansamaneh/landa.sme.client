export const baseUrl = "http://localhost:9090";
//export const baseUrl = "https://api.landa-sme.ir";

// export const isActiveOptions = [
//   {
//     label: "فعال",
//     value: "1",
//   },
//   {
//     label: "غیرفعال",
//     value: "0",
//   },
// ];

export const isActiveOptions = {
  active: 1,
  inActive: 0,
};

export const customerType = {
  legal: 171,
  person: 172,
  personnel: 173,
  engagement: 174,
  foreignNational: 175,
};

export const mediaType = {
  avatar: 291,
  image: 292,
  signature: 293,
  file: 294,
};

export const contactType = {
  phone: 271,
  mobile: 272,
  email: 273,
  address: 274,
  website: 275,
  socialNetwork: 276,
};

export const contactTypeIcons = {
  [contactType.phone]: "o_call",
  [contactType.mobile]: "o_phone_android",
  [contactType.email]: "o_mail",
  [contactType.address]: "",
  [contactType.website]: "o_public",
  [contactType.socialNetwork]: "o_share",
};

export const locationType = {
  country: 161,
  province: 162,
  city: 163,
  section: 164,
  town: 165,
};

export const logType = {
  create: 1,
  edit: 2,
  delete: 3,
  comment: 4,
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
  salesReturn: 3,
  purchaseReturn: 4,
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

export const voucherStatus = {
  init: "e84d4f06-29ea-4131-b78e-e36302d37e7c",
  final: "c84e9c9d-31e6-4f45-9a6d-265d825e3d4c",
  canceled: "a36af633-d0bb-4857-a542-364e12658d1c",
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
  cash: { id: 1071, color: "primary" },
  bankTransition: { id: 1073, color: "green" },
  check: { id: 1072, color: "red" },
  // pos: { id: 1074, color: "orange" },
  customer: { id: 1075, color: "bluegrey" },
};

export const paymentStatus = {
  normal: 1081,
  transferedToBank: 1082,
  cashed: 1083,
  checkBounced: 1084,
  checkSpent: 1085,
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

export const insurranceType = {
  normal: 0,
  none: 1,
};

export const quoteStatus = {
  temp: "e84d4f06-29ea-4131-b78e-e36302d37e7c",
  final: "c84e9c9d-31e6-4f45-9a6d-265d825e3d4c",
};

export const documentType = {
  voucher: "ee0d0341-14d3-4f30-8162-ca8b530ec229",
  invoice: "7b1af164-933c-4b5e-a4f0-0d71f95631b5",
  salesReturn: "7b1af164-933c-4b5e-a4f0-0d71f95631b6",
  purchaseReturn: "7b1af164-933c-4b5e-a4f0-0d71f95631b7",
  quote: "0d440906-db4c-4b8c-9ea4-eab511b13276",
  receipt: "94da37de-8e95-4945-a076-9b84f6bf6b67",
  payment: "d57fa724-5907-4c40-8837-2886ed97f5c0",
  paymentItem: "ab7fa720-a900-ac40-a830-a886ed97f5c0",
  bill: "d57ff724-5907-4c40-8837-2886ed97f5c0",
  wage: "65229df9-5eb9-490d-91da-adfa4fa2ed3c",
  purchase: "07948241-d71f-4adb-9169-e7bfa84cf8f3",
  transferMoney: "169918c3-f1c2-4fd1-80b0-bd7a786df654",
  invProduction: "109918c3-f1c2-4fd1-80b0-bd7a786df610",
  invOpeningStock: "109918c3-f1c2-4fd1-80b0-bd7a786df611",
  invModifyStock: "109918c3-f1c2-4fd1-80b0-bd7a786df612",
  invCloseOrder: "109918c3-f1c2-4fd1-80b0-bd7a786df613",
  invReposition: "3fa58a2f-dae1-4559-9920-58cff897822c",
};

export const paymentType = {
  cash: 1,
  trust: 2,
  both: 3,
};

export const formAction = {
  create: "create",
  edit: "edit",
  editBatch: "editBatch",
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

export const accountCLType = {
  currentAsset: "a0e42e83-83b3-4197-a27f-bed2b904d5a6",
  fixedAsset: "dca8e9b3-ed6f-4585-8b6b-8b5d84ab25fe",
  currentLiability: "39a38d45-00fa-4434-bf6e-0baf45dc51c3",
  longTermLiability: "99b941d5-a416-4298-8572-e7216a07dafe",
  equity: "c7b540da-1c4f-445a-a730-e5738d4c6ca8",
  revenue: "d562f27e-9af0-4e14-9e31-0d11c577e556",
  cogs: "33422e29-2694-4d91-abd7-90303c0e1966",
  expense: "5f4ae9d2-eeca-4ce6-a469-18db06d70dff",
  contra: "2926f151-1a55-476d-9025-57e0caea8561",
};

export const accountCLTypeIds = {
  asset: 1011,
  liablity: 1012,
  equity: 1013,
  revenue: 1014,
  expense: 1015,
  contra: 1016,
};
