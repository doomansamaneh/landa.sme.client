import { useTabs } from "src/components/areas/dashboard/_composables/useTabs";

export function useExpenseTab(metaData = []) {
  return useTabs(metaData, "expense");
}
