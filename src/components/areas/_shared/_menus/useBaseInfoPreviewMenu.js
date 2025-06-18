import { usePreviewMenu } from "../menus/usePreviewMenu";

export function useVoucherPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: context.baseRoute?.replace("/", "."),
  });
}
