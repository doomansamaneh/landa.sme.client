import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useRepositionPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "inv.reposition",
    exclude: ["sendMail", "printPdf"],
  });
}
