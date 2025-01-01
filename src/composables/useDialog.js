import { useQuasar } from "quasar";
import CustomFormDialog from "src/components/shared/CustomFormDialog.vue";

export function useDialog() {
  const $q = useQuasar();

  const openDialog = ({
    title,
    component,
    item,
    props,
    actions,
    okCallback,
  }) => {
    $q.dialog({
      component: CustomFormDialog,
      componentProps: {
        title: title,
        component: component,
        formProps: props,
        item: item,
        actions: actions,
      },
    }).onOk(async (response) => {
      if (okCallback) okCallback(response);
    });
  };

  return {
    openDialog,
  };
}
