import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";

export function useProductModel() {
  const route = useRoute();

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

  async function getById(id) {
    return await crudStore.getById(id);
  }

  onMounted(() => {
    getById(route.params.id);
  });

  return {
    model,
    editBatchModel,
    crudStore,
  };
}
