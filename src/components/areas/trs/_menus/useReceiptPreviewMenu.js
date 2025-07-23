import { usePreviewMenu } from "../../_shared/menus/usePreviewMenu";

export function useReceiptPreviewMenu(context) {
  return usePreviewMenu(context, {
    permissionPrefix: "trs.receipt",
    exclude: ["sendMail", "printPdf"],
  });
}
