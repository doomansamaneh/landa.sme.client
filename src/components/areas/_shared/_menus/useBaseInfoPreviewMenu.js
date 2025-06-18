import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useVoucherPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "acc.voucher",
  });
}
