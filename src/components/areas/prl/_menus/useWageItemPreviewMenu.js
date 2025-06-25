import { computed } from "vue";
import { menuItems } from "src/constants/menuItems";

export function useWageItemPreviewMenu(context, config = {}) {
  const { permissionPrefix = "prl.wageItem" } = config;

  return computed(() => [
    {
      ...menuItems.print,
      class: "primary-shadow primary-gradient text-white",
      permission: `${permissionPrefix}.print`,
      handler: () => context.print?.(),
      visible: true,
    },
  ]);
}
