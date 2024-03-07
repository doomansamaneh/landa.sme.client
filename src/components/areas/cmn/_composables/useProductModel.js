import { ref } from "vue";
import { useFormActions } from "src/composables/useFormActions";

export function useProductModel() {
  const model = ref({
    isActive: true,
    isForSale: true,
    isForPurchase: false,
  });

  const editBatchModel = ref({
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
  });

  const crudStore = useFormActions("cmn/product", model);

  return {
    model,
    editBatchModel,
    crudStore,
  };
}
