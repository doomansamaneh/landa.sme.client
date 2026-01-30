import { ref } from "vue";
import { useFormActions } from "src/composables/useFormActions";

export function useSendTelegram({ baseRoute, id }) {
  const model = ref({ id: id });

  const crudStore = useFormActions(baseRoute, model);

  async function getTelegram() {
    await crudStore.getById(id, `${baseRoute}/getTelegramModel`);
  }

  async function sendTelegram(callBack) {
    await crudStore.customPostAction("sendTelegram", model.value);
    if (callBack) callBack();
  }

  return {
    model,

    getTelegram,
    sendTelegram,
  };
}
