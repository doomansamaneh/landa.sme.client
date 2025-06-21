import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useContractPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "doc.contract",
    exclude: ["sendMail", "print"],
  });
}
