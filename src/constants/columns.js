import { sqlOperator, dataType } from "./enums";

export const id = {
  name: "id",
  field: "id",
  sortable: false,
  label: "id",
  align: "left",
  class: "text-left",
  style: "width:120px;",
  showFilter: false,
};

export const type = {
  name: "typeId",
  field: "typeId",
  sortable: true,
  label: "typeId",
  align: "left",
  class: "text-left",
  style: "width:150px;",
  showFilter: true,
};

export const code = {
  name: "code",
  field: "code",
  sortable: true,
  label: "code",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width:120px;",
  showFilter: true,
};

export const productGroupCode = {
  name: "productGroupCode",
  field: "productGroupCode",
  sortable: true,
  label: "productGroupCode",
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
  label: "productGroupTitle",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const productCode = {
  name: "productCode",
  field: "productCode",
  sortable: true,
  label: "productCode",
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
  label: "productTitle",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const productUnitTitle = {
  name: "productUnitTitle",
  field: "productUnitTitle",
  sortable: true,
  label: "productUnitTitle",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width:130px;",
  showFilter: true,
};

export const clCode = {
  name: "clCode",
  field: "clCode",
  sortable: true,
  label: "clCode",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width: 80px;",
  showFilter: true,
};

export const clTitle = {
  name: "clTitle",
  field: "clTitle",
  sortable: true,
  label: "clTitle",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const dlCode = {
  name: "dlCode",
  field: "dlCode",
  sortable: true,
  label: "dlCode",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width: 120px;",
  showFilter: true,
};

export const name = {
  name: "name",
  field: "name",
  sortable: true,
  label: "name",
  style: "",
  showFilter: true,
  class: "text-left",
  value: "",
};

export const loginName = {
  name: "loginName",
  field: "loginName",
  sortable: true,
  label: "loginName",
  style: "",
  showFilter: true,
  class: "text-left",
  value: "",
};

export const jobTitle = {
  name: "jobTitle",
  field: "jobTitle",
  sortable: true,
  label: "jobTitle",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const title = {
  name: "title",
  field: "title",
  sortable: true,
  label: "title",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const parentTitle = {
  name: "parentTitle",
  field: "parentTitle",
  sortable: true,
  label: "parentTitle",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const typeId = {
  name: "typeId",
  field: "typeId",
  sortable: true,
  label: "typeId",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width:120px;",
  showFilter: true,
  operator: sqlOperator.equal,
};

export const slCode = {
  name: "slCode",
  field: "slCode",
  sortable: true,
  label: "slCode",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  style: "width: 80px;",
  showFilter: true,
};

export const slTitle = {
  name: "slTitle",
  field: "slTitle",
  sortable: true,
  label: "slTitle",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const dlTitle = {
  name: "dlTitle",
  field: "dlTitle",
  sortable: true,
  label: "dlTitle",
  class: "text-left",
  cellClass: "text-left",
  cellStyle: "",
  showFilter: true,
};

export const isActive = {
  name: "isActive",
  field: "isActive",
  sortable: true,
  label: "isActive",
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
  label: "no",
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
  label: "itemNo",
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
  label: "date",
  class: "text-left",
  style: "width:100px",
  showFilter: true,
  type: dataType.date,
};

export const startDate = {
  ...date,
  name: "startDate",
  field: "startDate",
  label: "startDate",
};

export const finishDate = {
  ...date,
  name: "finishDate",
  field: "finishDate",
  label: "finishDate",
};

export const comment = {
  name: "comment",
  field: "comment",
  sortable: true,
  label: "comment",
  class: "text-left",
  showFilter: true,
};

export const itemComment = {
  name: "itemComment",
  field: "itemComment",
  sortable: true,
  label: "itemComment",
  class: "text-left",
  showFilter: true,
};

export const rowNo = {
  name: "rowNo",
  field: "rowNo",
  sortable: true,
  label: "rowNo",
  class: "text-left",
  style: "width:90px",
  showFilter: true,
};

export const voucherNo = {
  name: "voucherNo",
  field: "voucherNo",
  sortable: true,
  label: "voucherNo",
  class: "text-left",
  style: "width:100px",
  showFilter: true,
};

export const voucherDate = {
  name: "voucherDate",
  field: "voucherDate",
  sortable: true,
  label: "voucherDate",
  class: "text-left",
  style: "width:120px",
  showFilter: true,
  type: dataType.date,
};

export const voucherSubject = {
  name: "voucherSubject",
  field: "voucherSubject",
  sortable: true,
  label: "voucherSubject",
  class: "text-left",
  showFilter: true,
};

export const customerName = {
  name: "customerName",
  field: "customerName",
  sortable: true,
  label: "customerName",
  style: "",
  template: "{{customerCode}} {{customerName}}",
  showFilter: true,
  class: "text-left",
  style: "min-width:180px",
};

export const subject = {
  name: "subject",
  field: "subject",
  sortable: true,
  label: "subject",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const contractTitle = {
  name: "contractTitle",
  field: "contractTitle",
  sortable: true,
  label: "contractTitle",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const inventoryTitle = {
  name: "inventoryTitle",
  field: "inventoryTitle",
  sortable: true,
  label: "inventoryTitle",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const toInventoryTitle = {
  name: "toInventoryTitle",
  field: "toInventoryTitle",
  sortable: true,
  label: "toInventoryTitle",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const amount = {
  name: "amount",
  field: "amount",
  sortable: true,
  label: "amount",
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
  label: "taxAmount",
};

export const salary = {
  ...amount,
  name: "salary",
  field: "salary",
  label: "salary",
};

export const baseYear = {
  ...amount,
  name: "baseYear",
  field: "baseYear",
  label: "baseYear",
};

export const housing = {
  ...amount,
  name: "housing",
  field: "housing",
  label: "housing",
};

export const food = {
  ...amount,
  name: "food",
  field: "food",
  label: "food",
};

export const child = {
  ...amount,
  name: "child",
  field: "child",
  label: "child",
};

export const spouse = {
  ...amount,
  name: "spouse",
  field: "spouse",
  label: "spouse",
};

export const reward = {
  ...amount,
  name: "reward",
  field: "reward",
  label: "reward",
};

export const bonus = {
  ...amount,
  name: "bonus",
  field: "bonus",
  label: "bonus",
};

export const overtime = {
  ...amount,
  name: "overtime",
  field: "overtime",
  label: "overtime",
};

export const mission = {
  ...amount,
  name: "mission",
  field: "mission",
  label: "mission",
};

export const serviceBenefit = {
  ...amount,
  name: "serviceBenefit",
  field: "serviceBenefit",
  label: "serviceBenefit",
};

export const leave = {
  ...amount,
  name: "leave",
  field: "leave",
  label: "leave",
};

export const addition = {
  ...amount,
  name: "addition",
  field: "addition",
  label: "addition",
};

export const deduction = {
  ...amount,
  name: "deduction",
  field: "deduction",
  label: "deduction",
};

export const payable = {
  ...amount,
  name: "payable",
  field: "payable",
  class: "text-weight-700",
  label: "payable",
};

export const insurranceEmp = {
  ...amount,
  name: "insurranceEmp",
  field: "insurranceEmp",
  label: "insurranceEmp",
};

export const income = {
  ...amount,
  name: "income",
  field: "income",
  label: "income",
};

export const expense = {
  ...amount,
  name: "expense",
  field: "expense",
  label: "expense",
};

export const netIncome = {
  ...amount,
  name: "netIncome",
  field: "netIncome",
  label: "netIncome",
  class: "text-weight-600",
};

export const year = {
  name: "year",
  field: "year",
  sortable: true,
  label: "year",
  align: "left",
  class: "text-left",
  showFilter: true,
  style: "width:120px",
};

export const month = {
  ...year,
  name: "month",
  field: "month",
  label: "month",
  style: "width:90px",
};

export const day = {
  ...year,
  name: "day",
  field: "day",
  label: "day",
};

export const insurranceAmount = {
  ...amount,
  name: "insurranceAmount",
  field: "insurranceAmount",
  label: "insurranceAmount",
};

export const vatAmount = {
  ...amount,
  name: "vatAmount",
  field: "vatAmount",
  label: "vatAmount",
};

export const netAmount = {
  ...amount,
  name: "netAmount",
  field: "netAmount",
  label: "netAmount",
};

export const payedAmount = {
  ...amount,
  name: "payedAmount",
  field: "payedAmount",
  label: "payedAmount",
};

export const remainedAmount = {
  ...amount,
  name: "remainedAmount",
  field: "remainedAmount",
  label: "remainedAmount",
};

export const discountAmount = {
  ...amount,
  name: "discountAmount",
  field: "discountAmount",
  label: "discountAmount",
};

export const actions = {
  name: "actions",
  field: "",
  sortable: false,
  label: "actions",
  align: "left",
  class: "text-left",
  style: "width:160px;",
  showFilter: false,
};

export const debit = {
  name: "debit",
  field: "debit",
  sortable: false,
  label: "debit",
  align: "left",
  class: "text-left",
  style: "width:110px;",
  showFilter: false,
  type: dataType.number,
};

export const debitOpening = {
  name: "debitOpening",
  field: "debitOpening",
  sortable: false,
  label: "debitOpening",
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
  label: "inlineDebit",
  align: "left",
  class: "text-left",
  style: "width:120px;",
  showFilter: false,
  type: dataType.number,
  class: "text-weight-600",
};

export const debitRemained = {
  name: "debitRemained",
  field: "debitRemained",
  sortable: false,
  label: "debitRemained",
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
  label: "credit",
  align: "left",
  class: "text-left",
  style: "width:110px;",
  showFilter: false,
  type: dataType.number,
};

export const creditOpening = {
  name: "creditOpening",
  field: "creditOpening",
  sortable: false,
  label: "creditOpening",
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
  label: "creditRemained",
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
  label: "purchaseQuantity",
  align: "left",
  class: "text-left",
  style: "width:110px;",
  showFilter: false,
  type: dataType.number,
};

export const inQuantity = {
  ...purchaseQuantity,
  name: "inQuantity",
  field: "inQuantity",
  label: "inQuantity",
};

export const openingQuantity = {
  ...purchaseQuantity,
  name: "openingQuantity",
  field: "openingQuantity",
  label: "openingQuantity",
};

export const salesQuantity = {
  name: "salesQuantity",
  field: "salesQuantity",
  sortable: false,
  label: "salesQuantity",
  align: "left",
  class: "text-left",
  style: "width:110px;",
  showFilter: false,
  type: dataType.number,
};

export const outQuantity = {
  ...salesQuantity,
  name: "outQuantity",
  field: "outQuantity",
  label: "outQuantity",
};

export const quantity = {
  name: "quantity",
  field: "quantity",
  sortable: false,
  label: "quantity",
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
  label: "stock",
  align: "left",
  class: "text-left",
  style: "width:110px;",
  showFilter: false,
  type: dataType.number,
};

export const closingQuantity = {
  ...quantity,
  label: "closingQuantity",
  showFilter: false,
  class: "text-weight-600",
};

export const statusId = {
  name: "statusId",
  field: "statusId",
  label: "statusId",
  align: "left",
  class: "text-left",
  style: "width:120px;",
  showFilter: true,
};

export const unitTitle = {
  name: "unitTitle",
  field: "unitTitle",
  sortable: true,
  label: "unitTitle",
  align: "left",
  class: "text-left",
  style: "width:180px;",
  showFilter: true,
};

export const inlineQuantity = {
  name: "inlineQuantity",
  field: "inlineQuantity",
  sortable: false,
  label: "inlineQuantity",
  align: "left",
  style: "width:130px;",
  class: "text-left text-weight-600",
  showFilter: false,
  type: dataType.number,
};

export const price = {
  name: "price",
  field: "price",
  sortable: false,
  label: "price",
  align: "left",
  class: "text-left",
  showFilter: true,
  type: dataType.number,
};

export const openingPrice = {
  ...price,
  name: "openingPrice",
  field: "openingPrice",
  label: "openingPrice",
  showFilter: false,
};

export const totalPrice = {
  ...price,
  name: "totalPrice",
  field: "totalPrice",
  label: "totalPrice",
  showFilter: false,
};

export const openingTotalPrice = {
  ...price,
  name: "openingTotalPrice",
  field: "openingTotalPrice",
  label: "openingTotalPrice",
  showFilter: false,
};

export const inTotalPrice = {
  ...price,
  name: "inTotalPrice",
  field: "inTotalPrice",
  label: "inTotalPrice",
  showFilter: false,
};

export const inPrice = {
  ...price,
  name: "inPrice",
  field: "inPrice",
  label: "inPrice",
  showFilter: false,
};

export const outPrice = {
  ...price,
  name: "outPrice",
  field: "outPrice",
  label: "outPrice",
  showFilter: false,
};

export const outTotalPrice = {
  ...price,
  name: "outTotalPrice",
  field: "outTotalPrice",
  label: "outTotalPrice",
  showFilter: false,
};

export const cogs = {
  ...price,
  name: "cogs",
  field: "cogs",
  label: "cogs",
  showFilter: false,
};

export const summary = {
  name: "summary",
  field: "summary",
  sortable: false,
  label: "summary",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const address = {
  name: "address",
  field: "address",
  sortable: true,
  label: "address",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const provinceTitle = {
  name: "provinceTitle",
  field: "provinceTitle",
  sortable: true,
  label: "provinceTitle",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const taxNo = {
  name: "taxNo",
  field: "taxNo",
  sortable: true,
  label: "taxNo",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const nationalNo = {
  name: "nationalNo",
  field: "nationalNo",
  sortable: true,
  label: "nationalNo",
  align: "left",
  class: "text-left",
  showFilter: true,
};

export const currencyTitle = {
  name: "currencyTitle",
  field: "currencyTitle",
  sortable: true,
  label: "currencyTitle",
  align: "left",
  class: "text-left",
  showFilter: true,
};
