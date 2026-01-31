import { computed } from "vue";
import { useFormActions } from "src/composables/useFormActions";
import { downloadManager } from "src/helpers";
import { usePrint } from "src/composables/usePrint";
import { useDialog } from "src/composables/useDialog";
import SendEmailForm from "../forms/SendEmailForm.vue";
import SendWhatsAppForm from "../forms/SendWhatsAppForm.vue";
import SendTelegramForm from "../forms/SendTelegramForm.vue";

export function usePreviewMenuContext(
  model,
  baseRoute,
  //id,
  customHandlers = {}
) {
  const dialogStore = useDialog();
  const printStore = usePrint();
  const crudStore = useFormActions(baseRoute);

  const defaultHandlers = {
    print: () => printStore.handlePrint(),

    downloadPdf: () => {
      downloadManager.downloadGet(
        `${baseRoute}/generatePdf/${model?.id}`
      );
    },

    sendMail: () => {
      dialogStore.openDialog({
        title: `shared.labels.sendMail`,
        component: SendEmailForm,
        actionBar: true,
        props: {
          id: model?.id,
          baseRoute,
        },
      });
    },

    sendWhatsApp: () => {
      dialogStore.openDialog({
        title: `shared.labels.sendWhatsApp`,
        component: SendWhatsAppForm,
        actionBar: true,
        props: {
          id: model?.id,
          baseRoute,
        },
      });
    },

    sendTelegram: () => {
      dialogStore.openDialog({
        title: `shared.labels.sendTelegram`,
        component: SendTelegramForm,
        actionBar: true,
        props: {
          id: model?.id,
          baseRoute,
        },
      });
    },

    deleteById: () => {
      crudStore.deleteById(model?.id, () => {
        customHandlers.onDeleteSuccess?.();
        //router.back();
      });
    },
  };

  const context = computed(() => ({
    model,
    id: model?.id,
    baseRoute,
    ...defaultHandlers,
    ...customHandlers,
  }));

  return context;
}
