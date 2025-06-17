import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useCustomerPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "crm.customer",
  });
}
