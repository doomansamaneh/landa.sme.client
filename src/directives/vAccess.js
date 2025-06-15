import { useBusiness } from "src/stores/useBusiness";

export const vAccess = {
  mounted(el, binding) {
    const requiredPermission = binding.value;

    let hasPermission = true;
    if (requiredPermission) {
      const { get } = useBusiness();
      const grants = get()?.grants || [];
      hasPermission = grants.some(
        (grant) =>
          grant.toLowerCase() === requiredPermission.toLowerCase()
      );
    }

    if (!hasPermission) {
      el.style.display = "none";
    }
  },
};
