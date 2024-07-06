import { ref } from "vue";
import { useFormActions } from "src/composables/useFormActions";
import { repositionColumns } from "../../inv/_composables/constants";

export function usePaymentInvoiceModel() {
  const baseRoute = "trs/paymentInvoice";

  const model = ref({});

  const crudStore = useFormActions(baseRoute, model);

  async function getCreateModel(id) {
    await crudStore.getById(id, `${baseRoute}/getRemainedModel`);
  }

  async function submitForm(form, callBack) {
    return await crudStore.submitForm(form, "create", callBack);
  }

  return {
    model,
    getCreateModel,
    submitForm,
  };
}
