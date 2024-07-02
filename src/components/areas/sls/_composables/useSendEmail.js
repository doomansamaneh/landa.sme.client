import { ref } from "vue";
import { useFormActions } from "src/composables/useFormActions";

export function useSendEmail(config) {
  const model = ref({});

  const crudStore = useFormActions(config.baseRoute, model);

  async function getEmail(id) {
    await crudStore.getById(id, `${config.baseRoute}/getEmail`);
  }

  async function sendEmail(callBack) {
    await crudStore.customPostAction("sendEmail", model.value);
    if (callBack) callBack();
  }

  return {
    model,

    getEmail,
    sendEmail,
  };
}
