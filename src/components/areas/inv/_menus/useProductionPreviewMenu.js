import { computed } from "vue";
import { usePreview } from "src/composables/usePreview";
import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";
import { menuItems } from "src/constants/menuItems";

import DataGridPreview from "src/components/areas/inv/production/shared/preview/printPreview/DataGridPreview.vue";

export function useProductionPreviewMenu(context) {
  const previewStore = usePreview();

  const openPreview = () => {
    previewStore.openDialog({
      title: "main-menu-items.Inv_Production_View",
      component: DataGridPreview,
      previewProps: {
        model: context.model.value,
        title: "main-menu-items.Inv_Production_View",
      },
    });
  };

  return usePreviewMenu(context, {
    permissionPrefix: "inv.production",
    exclude: ["sendMail", "printPdf"],

    overrideItems: {
      edit: {
        ...menuItems.edit,
        class: "primary-gradient primary-shadow text-white",
        route: `/${context.baseRoute}/edit/${context.id}`,
        visible: true,
      },
      copy: {
        ...menuItems.copy,
        route: `/${context.baseRoute}/copy/${context.id}`,
        visible: true,
      },
      delete: {
        ...menuItems.delete,
        handler: () => {
          context.delete?.();
        },
        visible: true,
      },
      print: {
        ...menuItems.more,
        icon: "o_print",
        label: "print",
        permission: "inv.production.print",
        visible: true,
        subItems: [
          {
            ...menuItems.print,
            permission: "inv.production.print",
            handler: openPreview,
            visible: true,
            addSeparator: false,
          },
        ],
      },
    },
  });
}
