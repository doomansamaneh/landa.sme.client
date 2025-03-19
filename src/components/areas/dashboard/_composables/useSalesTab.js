import { useTabs } from "./useTabs";

export function useSalesTab(metaData = []) {
  return useTabs(metaData, "sales");
}
