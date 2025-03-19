import { useTabs } from "./useTabs";

export function useGeneralTab(metaData = []) {
  return useTabs(metaData, "general");
}
