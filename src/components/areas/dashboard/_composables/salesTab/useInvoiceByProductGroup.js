import { computed } from "vue";
import { useReport } from "src/components/areas/sls/_composables/useReport";

export function useInvoiceByProductGroup() {
  const reportStore = useReport("invoiceByProductGroup");

  return {
    total: computed(() => reportStore.total.value),
    chartLabels: computed(() => reportStore.chartLabels.value),
    chartSeries: computed(() => reportStore.chartSeries.value),
    showLoader: computed(() => false),
  };
}
