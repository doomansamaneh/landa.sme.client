import { ref, onMounted, onUnmounted } from "vue";
import { fetchWrapper, bus } from "src/helpers";

const isLoading = ref(false);

export function useCustomerInvoiceSummary(customerId) {
  const data = ref(null);

  onMounted(() => {
    reloadData();
    bus.on("render-page", reloadData);
  });

  onUnmounted(() => {
    bus.off("render-page", reloadData);
  });

  async function reloadData() {
    isLoading.value = true;
    const response = await fetchWrapper.get(
      `sls/report/InvoiceSummaryByCustomer/${customerId}`,
      null,
      true
    );
    isLoading.value = false;
    data.value = response.data.data;
  }

  return {
    data,

    reloadData,
    isLoading,
  };
}
