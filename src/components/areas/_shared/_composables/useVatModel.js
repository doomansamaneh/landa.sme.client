import { ref } from "vue";
import { vatModel, vatDeductionItemModel } from "src/models/areas/cmn/vatModel";
import { useFormActions } from "src/composables/useFormActions";

export function useVatModel() {
  const model = ref(vatModel);

  const crudStore = useFormActions("cmn/vat", model);

  const addNewRow = (index, currentRow) => {
    const newRow = { ...vatDeductionItemModel };
    newRow.rate = model.value.rate - currentRow.rate;
    model.value.vatDeductionItems.splice(index + 1, 0, newRow);
  };

  const deleteRow = (index) => {
    model.value.vatDeductionItems.splice(index, 1);
  };

  const pushNewRow = () => {
    model.value.vatDeductionItems.push({ ...vatDeductionItemModel });
  };

  return {
    model,
    crudStore,

    addNewRow,
    pushNewRow,
    deleteRow,
  };
}
