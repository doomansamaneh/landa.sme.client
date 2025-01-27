import { sqlOperator, dataType } from "./enums";

export const id = {
  name: "id",
  field: "id",
  sortable: false,
  label: "نوع",
  align: "left",
  class: "text-left",
  style: "width:120px;",
  showFilter: false,
};

export const type = {
  name: "typeId",
  field: "typeId",
  sortable: true,
  label: "نوع",
  align: "left",
  class: "text-left",
  style: "width:150px;",
  showFilter: true,
};

export const code = {
  name: "code",
  field: "code",
  sortable: true,
  label: "کد",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width:130px;",
  showFilter: true,
};

export const productGroupCode = {
  name: "productGroupCode",
  field: "productGroupCode",
  sortable: true,
  label: "کد گروه",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width:130px;",
  showFilter: true,
};

export const productGroupTitle = {
  name: "productGroupTitle",
  field: "productGroupTitle",
  sortable: true,
  label: "گروه",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const productCode = {
  name: "productCode",
  field: "productCode",
  sortable: true,
  label: "کد کالا",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width:130px;",
  showFilter: true,
};

export const productTitle = {
  name: "productTitle",
  field: "productTitle",
  sortable: true,
  label: "کالا / خدمت",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const productUnitTitle = {
  name: "productUnitTitle",
  field: "productUnitTitle",
  sortable: true,
  label: "واحد سنجش",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width:130px;",
  showFilter: true,
};

export const slCode = {
  name: "slCode",
  field: "slCode",
  sortable: true,
  label: "کد معین",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width: 80px;",
  showFilter: true,
};

export const dlCode = {
  name: "dlCode",
  field: "dlCode",
  sortable: true,
  label: "کد تفصیلی",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width: 90px;",
  showFilter: true,
};

export const name = {
  name: "name",
  field: "name",
  sortable: true,
  label: "نام",
  style: "",
  showFilter: true,
  class: "text-left",
  value: "",
};

export const loginName = {
  name: "loginName",
  field: "loginName",
  sortable: true,
  label: "نام کاربری",
  style: "",
  showFilter: true,
  class: "text-left",
  value: "",
};

export const jobTitle = {
  name: "jobTitle",
  field: "jobTitle",
  sortable: true,
  label: "شغل",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const title = {
  name: "title",
  field: "title",
  sortable: true,
  label: "عنوان",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const parentTitle = {
  name: "parentTitle",
  field: "parentTitle",
  sortable: true,
  label: "بالادستی",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const typeId = {
  name: "typeId",
  field: "typeId",
  sortable: true,
  label: "نوع",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width:120px;",
  showFilter: true,
  operator: sqlOperator.equal,
};

export const slTitle = {
  name: "slTitle",
  field: "slTitle",
  sortable: true,
  label: "حساب معین",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const dlTitle = {
  name: "dlTitle",
  field: "dlTitle",
  sortable: true,
  label: "حساب تفصیلی",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const isActive = {
  name: "isActive",
  field: "isActive",
  sortable: true,
  label: "فعال",
  align: "left",
  class: "text-left",
  style: "width:120px;",
  operator: sqlOperator.equal,
  showFilter: true,
};

export const no = {
  name: "no",
  field: "no",
  sortable: true,
  label: "شماره",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width:100px;",
  showFilter: true,
  //operator: sqlOperator.equal,
  value: "",
};

export const itemNo = {
  name: "itemNo",
  field: "itemNo",
  sortable: true,
  label: "شماره چک",
  class: "text-left",
  cellClass: "text-left",
  style: "width:100px;",
  showFilter: true,
};

export const date = {
  name: "date",
  field: "date",
  //template: "{{dateString}}",
  sortable: true,
  label: "تاریخ",
  class: "text-left",
  style: "width:100px",
  showFilter: true,
  type: dataType.date,
};

export const comment = {
  name: "comment",
  field: "comment",
  sortable: true,
  label: "شرح",
  class: "text-left",
  showFilter: true,
};

export const itemComment = {
  name: "itemComment",
  field: "itemComment",
  sortable: true,
  label: "شرح",
  class: "text-left",
  showFilter: true,
};

export const rowNo = {
  name: "rowNo",
  field: "rowNo",
  sortable: true,
  label: "ش پیگیری",
  class: "text-left",
  style: "width:90px",
  showFilter: true,
};

export const voucherNo = {
  name: "voucherNo",
  field: "voucherNo",
  sortable: true,
  label: "ش سند",
  class: "text-left",
  style: "width:80px",
  showFilter: true,
};

export const voucherDate = {
  name: "voucherDate",
  field: "voucherDate",
  template: "{{ voucherDateString }}",
  sortable: true,
  label: "تاریخ",
  class: "text-left",
  style: "width:90px",
  showFilter: true,
  type: dataType.number,
};

export const voucherSubject = {
  name: "voucherSubject",
  field: "voucherSubject",
  sortable: true,
  label: "شرح",
  class: "text-left",
  showFilter: true,
};

export const customerName = {
  name: "customerName",
  field: "customerName",
  sortable: true,
  label: "طرف حساب",
  style: "",
  template: "{{customerCode}} {{customerName}}",
  showFilter: true,
  class: "text-left",
  //style: "width:320px",
};

export const subject = {
  name: "subject",
  field: "subject",
  sortable: true,
  label: "شرح",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const contractTitle = {
  name: "contractTitle",
  field: "contractTitle",
  sortable: true,
  label: "قرارداد",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const inventoryTitle = {
  name: "inventoryTitle",
  field: "inventoryTitle",
  sortable: true,
  label: "انبار",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const toInventoryTitle = {
  name: "toInventoryTitle",
  field: "toInventoryTitle",
  sortable: true,
  label: "انبار مقصد",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const amount = {
  name: "amount",
  field: "amount",
  sortable: true,
  label: "جمع کل",
  align: "left",
  class: "text-left",
  showFilter: true,
  style: "width:120px",
  type: dataType.number,
};

export const taxAmount = {
  ...amount,
  name: "taxAmount",
  field: "taxAmount",
  label: "مالیات",
};

export const salary = {
  ...amount,
  name: "salary",
  field: "salary",
  label: "دستمزد روزانه",
};

export const baseYear = {
  ...amount,
  name: "baseYear",
  field: "baseYear",
  label: "پایه سنوات",
};

export const housing = {
  ...amount,
  name: "housing",
  field: "housing",
  label: "حق مسکن",
};

export const food = {
  ...amount,
  name: "food",
  field: "food",
  label: "بن",
};

export const child = {
  ...amount,
  name: "child",
  field: "child",
  label: "حق اولاد",
};

export const spouse = {
  ...amount,
  name: "spouse",
  field: "spouse",
  label: "حق تاهل",
};

export const reward = {
  ...amount,
  name: "reward",
  field: "reward",
  label: "پاداش بهره‌وری",
};

export const bonus = {
  ...amount,
  name: "bonus",
  field: "bonus",
  label: "عیدی و پاداش",
};

export const overtime = {
  ...amount,
  name: "overtime",
  field: "overtime",
  label: "اضافه کار",
};

export const mission = {
  ...amount,
  name: "mission",
  field: "mission",
  label: "ماموریت",
};

export const serviceBenefit = {
  ...amount,
  name: "serviceBenefit",
  field: "serviceBenefit",
  label: "بازخرید سنوات",
};

export const leave = {
  ...amount,
  name: "leave",
  field: "leave",
  label: "بازخرید مرخصی",
};

export const addition = {
  ...amount,
  name: "addition",
  field: "addition",
  label: "سایر مزایا",
};

export const deduction = {
  ...amount,
  name: "deduction",
  field: "deduction",
  label: "سایر کسورات",
};

export const payable = {
  ...amount,
  name: "payable",
  field: "payable",
  class: "text-weight-700",
  label: "قابل پرداخت",
};

export const insurranceEmp = {
  ...amount,
  name: "insurranceEmp",
  field: "insurranceEmp",
  label: "بیمه کارگر",
};

export const year = {
  name: "year",
  field: "year",
  sortable: true,
  label: "سال",
  align: "left",
  class: "text-left",
  showFilter: true,
  style: "width:120px",
};

export const month = {
  ...year,
  name: "month",
  field: "month",
  label: "ماه",
  style: "width:90px",
};

export const day = {
  ...year,
  name: "day",
  field: "day",
  label: "کارکرد",
};

export const insurranceAmount = {
  ...amount,
  name: "insurranceAmount",
  field: "insurranceAmount",
  label: "بیمه",
};

export const vatAmount = {
  ...amount,
  name: "vatAmount",
  field: "vatAmount",
  label: "ارزش افزوده",
};

export const netAmount = {
  ...amount,
  name: "netAmount",
  field: "netAmount",
  label: "مبلغ پس از تخفیف",
};

export const payedAmount = {
  ...amount,
  name: "payedAmount",
  field: "payedAmount",
  label: "دریافت شده",
};

export const remainedAmount = {
  ...amount,
  name: "remainedAmount",
  field: "remainedAmount",
  label: "مانده",
};

export const discountAmount = {
  ...amount,
  name: "discountAmount",
  field: "discountAmount",
  label: "تخفیف",
};

export const actions = {
  name: "actions",
  field: "",
  sortable: false,
  label: "",
  align: "left",
  class: "text-left",
  style: "width:160px;",
  showFilter: false,
};

export const debit = {
  name: "debit",
  field: "debit",
  sortable: false,
  label: "بدهکار",
  align: "left",
  class: "text-left",
  style: "width:110px;",
  showFilter: false,
  type: dataType.number,
};

export const inlineDebit = {
  name: "inlineDebit",
  field: "inlineDebit",
  sortable: false,
  label: "مانده بدهکار",
  align: "left",
  class: "text-left",
  style: "width:120px;",
  showFilter: false,
  type: dataType.number,
};

export const debitRemained = {
  name: "debitRemained",
  field: "debitRemained",
  sortable: false,
  label: "مانده بدهکار",
  align: "left",
  class: "text-left",
  style: "width:120px;",
  showFilter: false,
  type: dataType.number,
};

export const credit = {
  name: "credit",
  field: "credit",
  sortable: false,
  label: "بستانکار",
  align: "left",
  class: "text-left",
  style: "width:110px;",
  showFilter: false,
  type: dataType.number,
};

export const creditRemained = {
  name: "creditRemained",
  field: "creditRemained",
  sortable: false,
  label: "مانده بستانکار",
  align: "left",
  class: "text-left",
  style: "width:120px;",
  showFilter: false,
  type: dataType.number,
};

export const purchaseQuantity = {
  name: "purchaseQuantity",
  field: "purchaseQuantity",
  sortable: false,
  label: "ورود",
  align: "left",
  class: "text-left",
  style: "width:110px;",
  showFilter: false,
  type: dataType.number,
};

export const salesQuantity = {
  name: "salesQuantity",
  field: "salesQuantity",
  sortable: false,
  label: "خروج",
  align: "left",
  class: "text-left",
  style: "width:110px;",
  showFilter: false,
  type: dataType.number,
};

export const quantity = {
  name: "quantity",
  field: "quantity",
  sortable: false,
  label: "تعداد/مقدار",
  align: "left",
  class: "text-left",
  style: "width:110px;",
  showFilter: true,
  type: dataType.number,
};

export const stock = {
  name: "stock",
  field: "stock",
  sortable: false,
  label: "موجودی",
  align: "left",
  class: "text-left",
  style: "width:110px;",
  showFilter: false,
  type: dataType.number,
};

export const statusId = {
  name: "statusId",
  field: "statusId",
  label: "وضعیت",
  align: "left",
  class: "text-left",
  style: "width:120px;",
  showFilter: true,
};

export const unitTitle = {
  name: "unitTitle",
  field: "unitTitle",
  sortable: true,
  label: "واحد سنجش",
  align: "left",
  class: "text-left",
  style: "width:180px;",
  showFilter: true,
};

export const inlineQuantity = {
  name: "inlineQuantity",
  field: "inlineQuantity",
  sortable: false,
  label: "موجودی",
  align: "left",
  class: "text-left",
  showFilter: false,
  type: dataType.number,
};

export const price = {
  name: "price",
  field: "price",
  sortable: false,
  label: "مبلغ",
  align: "left",
  class: "text-left",
  showFilter: true,
  type: dataType.number,
};

export const summary = {
  name: "summary",
  field: "summary",
  sortable: false,
  label: "شرح",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const address = {
  name: "address",
  field: "address",
  sortable: true,
  label: "نشانی",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const provinceTitle = {
  name: "provinceTitle",
  field: "provinceTitle",
  sortable: true,
  label: "استان",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const taxNo = {
  name: "taxNo",
  field: "taxNo",
  sortable: true,
  label: "شماره اقتصادی",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const nationalNo = {
  name: "nationalNo",
  field: "nationalNo",
  sortable: true,
  label: "شناسه ملی",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const currencyTitle = {
  name: "currencyTitle",
  field: "currencyTitle",
  sortable: true,
  label: "ارز",
  align: "left",
  class: "text-left",
  showFilter: true,
};
