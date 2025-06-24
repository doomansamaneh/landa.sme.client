import { computed } from "vue";
import { useRouter } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { downloadManager } from "src/helpers";
import { usePrint } from "src/composables/usePrint";
import { useDialog } from "src/composables/useDialog";
import SendEmailForm from "../forms/SendEmailForm.vue";

export function usePreviewMenuContext(
  model,
  baseRoute,
  id,
  customHandlers = {}
) {
  const router = useRouter();
  const dialogStore = useDialog();
  const printStore = usePrint();
  const crudStore = useFormActions(baseRoute);

  const defaultHandlers = {
    print: () => printStore.handlePrint(),

    downloadPdf: () => {
      downloadManager.downloadGet(
        `${baseRoute}/generatePdf/${id ?? model?.id}`
      );
    },

    sendMail: () => {
      dialogStore.openDialog({
        title: `shared.labels.sendMail`,
        component: SendEmailForm,
        actionBar: true,
        props: {
          id: id ?? model?.id,
          baseRoute,
        },
      });
    },

    deleteById: () => {
      crudStore.deleteById(id ?? model?.id, () => {
        customHandlers.onDeleteSuccess?.();
        //router.back();
      });
    },
  };

  const context = computed(() => ({
    model,
    baseRoute,
    id: id ?? model?.id,
    ...defaultHandlers,
    ...customHandlers, // overrides or additional
  }));

  return context;
}
