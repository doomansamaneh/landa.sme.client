import { useDataGridMenu } from "../../_shared/menus/useDataGridMenu";

export function useContractDataGridMenu(context) {
  return useDataGridMenu(context, {
    baseRoute: "doc/contract",
    permissionPrefix: "doc.contract",
  });
}
