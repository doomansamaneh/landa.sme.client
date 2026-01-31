import { ref } from "vue";
import { useFormActions } from "src/composables/useFormActions";

export function useSendWhatsApp({ baseRoute, id }) {
  const model = ref({ id: id });

  const crudStore = useFormActions(baseRoute, model);

  async function getWhatsApp() {
    await crudStore.getById(id, `${baseRoute}/getWhatsAppModel`);
  }

  async function sendWhatsApp(callBack) {
    await crudStore.customPostAction("sendWhatsApp", model.value);
    if (callBack) callBack();
  }

  return {
    model,

    getWhatsApp,
    sendWhatsApp,
  };
}
