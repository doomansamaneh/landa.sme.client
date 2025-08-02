import { useBusiness } from "src/stores/useBusiness";

export function useAccess() {
  const hasAccess = (permission) => {
    if (!permission) return true;

    const { get } = useBusiness();
    const grants = get()?.grants || [];

    return grants.some(
      (grant) => grant.toLowerCase() === permission.toLowerCase()
    );
  };

  return { hasAccess };
}
