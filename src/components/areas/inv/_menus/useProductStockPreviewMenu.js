import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";
import { menuItems } from "src/constants/menuItems";
import { useDialog } from "src/composables/useDialog";
import ModifyStockForm from "src/components/areas/inv/modifyStock/shared/forms/ModifyStockForm.vue";

export function useProductStockPreviewMenu(context) {
  const dialogStore = useDialog();

  return usePreviewMenu(context, {
    permissionPrefix: "inv.productStock",
    exclude: ["copy", "delete", "print", "sendMail"],

    overrideItems: {
      edit: {
        ...menuItems.edit,
        label: "modifyStock",
        class: "primary-gradient primary-shadow text-white",
        handler: () => {
          dialogStore.openDialog({
            title: "main-menu-items.Inv_ModifyStock_View",
            component: ModifyStockForm,
            props: { id: context.model?.id },
            actionBar: true,
            okCallback: async (response) => {
              //await context.model?.value?.reloadData?.();
            },
          });
        },
        visible: true,
      },
    },
  });
}
