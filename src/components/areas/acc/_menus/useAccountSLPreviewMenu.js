import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useAccountSLPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "doc.contract",
    exclude: ["sendMail", "print"],
  });
}
