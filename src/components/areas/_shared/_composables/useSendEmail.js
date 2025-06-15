import { ref } from "vue";
import { useFormActions } from "src/composables/useFormActions";

export function useSendEmail({ baseRoute, id }) {
  const model = ref({ id: id });

  const crudStore = useFormActions(baseRoute, model);

  async function getEmail() {
    await crudStore.getById(id, `${baseRoute}/getEmailModel`);
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
