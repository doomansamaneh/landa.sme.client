import { useTabs } from "src/components/areas/dashboard/_composables/useTabs";

export function useSalesTab(metaData = []) {
  return useTabs(metaData, "sales");
}
