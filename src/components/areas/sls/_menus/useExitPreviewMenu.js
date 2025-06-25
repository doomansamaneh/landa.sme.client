import { computed } from "vue";
import { menuItems } from "src/constants/menuItems";

export function useExitPreviewMenu(context) {
  return computed(() => {
    const menu = [
      {
        ...menuItems.print,
        permission: `sls.invoice.print`,
        class: "primary-gradient primary-shadow text-white",
        handler: () => context.print?.(),
        visible: true,
      },
    ];

    return menu;
  });
}
