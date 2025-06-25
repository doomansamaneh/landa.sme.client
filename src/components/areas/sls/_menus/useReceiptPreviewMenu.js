import { computed } from "vue";
import { menuItems } from "src/constants/menuItems";

export function useReceiptPreviewMenu(context) {
  return computed(() => {
    const menu = [
      {
        ...menuItems.print,
        permission: `sls.purchase.print`,
        class: "primary-gradient primary-shadow text-white",
        handler: () => context.print?.(),
        visible: true,
      },
    ];

    return menu;
  });
}
