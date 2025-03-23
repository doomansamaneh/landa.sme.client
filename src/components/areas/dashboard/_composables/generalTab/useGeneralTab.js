import { useTabs } from "src/components/areas/dashboard/_composables/useTabs";

export function useGeneralTab(metaData = []) {
  return useTabs(metaData, "general");
}
