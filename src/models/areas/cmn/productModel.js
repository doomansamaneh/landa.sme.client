import { productType } from "src/constants";
export const productModel = {
  isActive: true,
  isForSale: true,
  isForPurchase: false,
  price: 0,
  purchasePrice: 0,
  typeId: productType.main,
};

export const productBatchModel = {
  productGroup: {
    fieldName: "ProductGroupId",
    isModified: false,
  },
  taxCode: {
    fieldName: "TaxCode",
    isModified: false,
  },
  productType: {
    fieldName: "TypeId",
    isModified: false,
  },
  productUnit: {
    fieldName: "ProductUnitId",
    isModified: false,
  },
  isForPurchase: {
    fieldName: "IsForPurchase",
    fieldValue: "0",
    isModified: false,
  },
  isForSale: {
    fieldName: "IsForSale",
    fieldValue: "0",
    isModified: false,
  },
  isActive: {
    fieldName: "IsActive",
    fieldValue: "0",
    isModified: false,
  },
};
