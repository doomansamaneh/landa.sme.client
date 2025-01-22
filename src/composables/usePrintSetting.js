import { useQuasar } from "quasar";
import PrintSetting from "src/components/shared/dialogs/PrintSettingDialog.vue";

export function useDialog() {
  const $q = useQuasar();

  const openDialog = ({
    title,
    component,
    item,
    width,
    props,
    actions,
    okCallback,
  }) => {
    $q.dialog({
      component: PrintSetting,
      componentProps: {
        title: title,
        component: component,
        formProps: props,
        item: item,
        width: width,
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
