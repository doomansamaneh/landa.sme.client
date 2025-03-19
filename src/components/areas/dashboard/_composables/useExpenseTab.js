import { useTabs } from "./useTabs";

export function useExpenseTab(metaData = []) {
  return useTabs(metaData, "expense");
}
