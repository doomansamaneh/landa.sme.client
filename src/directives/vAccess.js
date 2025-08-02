import { useAccess } from "./useAccess";

export const vAccess = {
  mounted(el, binding) {
    const requiredPermission = binding.value;

    const { hasAccess } = useAccess();
    const allowed = hasAccess(requiredPermission);

    if (!allowed) {
      el.style.display = "none";
    }
  },
};
