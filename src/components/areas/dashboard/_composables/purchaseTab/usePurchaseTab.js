import { useTabs } from "src/components/areas/dashboard/_composables/useTabs";

export function usePurchaseTab(metaData = []) {
  return useTabs(metaData, "purchase");
}
