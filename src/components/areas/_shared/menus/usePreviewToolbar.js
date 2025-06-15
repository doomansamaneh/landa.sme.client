import { computed } from "vue";
import { useRouter } from "vue-router";
import { downloadManager } from "src/helpers";
import { usePrint } from "src/composables/usePrint";
import { useDialog } from "src/composables/useDialog";
import SendEmailForm from "../forms/SendEmailForm.vue";

export function usePreviewToolbar({
  model,
  baseRoute,
  crudStore,
  menuBuilder,
  onDeleteSuccess,
}) {
  const router = useRouter();
  const dialogStore = useDialog();
  const printStore = usePrint();

  function deleteCallBack() {
    onDeleteSuccess?.();
    router.back();
  }

  function sendMail() {
    dialogStore.openDialog({
      title: `shared.labels.sendMail`,
      component: SendEmailForm,
      actionBar: true,
      props: {
        id: model?.id,
        baseRoute: baseRoute,
      },
    });
  }

  const downloadPdf = () => {
    downloadManager.downloadGet(
      `${baseRoute}/generatePdf/${model?.id}`
    );
  };

  const context = computed(() => ({
    model,
    baseRoute,
    downloadPdf,
    sendMail,
    print: () => printStore.handlePrint(),
    deleteById: () =>
      crudStore?.deleteById(model?.id, deleteCallBack),
  }));

  const menuItems = computed(() => menuBuilder(context.value));

  return {
    menuItems,
  };
}
