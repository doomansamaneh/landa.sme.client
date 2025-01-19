import { useQuasar } from "quasar";
import PreviewDialog from "src/components/shared/PreviewDialog.vue";

export function usePreview() {
  const $q = useQuasar();

  const openDialog = ({
    title,
    component,
    previewProps,
    okCallback,
  }) => {
    $q.dialog({
      component: PreviewDialog,
      componentProps: {
        title: title,
        component: component,
        previewProps: previewProps,
      },
    }).onOk(async (response) => {
      if (okCallback) okCallback(response);
    });
  };

  return {
    openDialog,
  };
}
