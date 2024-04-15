export const vatDeductionItemModel = {
  rate: 10,
  title: "مالیات بر ارزش افزوده پرداختنی",
};

export const vatModel = {
  isActive: true,
  isForSale: 2,
  rate: 10,
  vatDeductionItems: [{ ...vatDeductionItemModel }],
};
