import { ref, onMounted, onUnmounted, computed } from "vue";
import { fetchWrapper, bus } from "src/helpers";
import { useComposables } from "src/stores/useComposables";

const firstLoad = ref(false);
const isLoading = ref(false);
const data = ref(null);

export function useInvoiceSummary() {
  const composablesStore = useComposables();
  composablesStore.register({
    reset: () => {
      firstLoad.value = false;
    },
  });

  onMounted(() => {
    loadData();
    bus.on("render-page", loadData);
  });

  onUnmounted(() => {
    bus.off("render-page", loadData);
  });

  async function loadData() {
    if (!firstLoad.value) {
      firstLoad.value = true;
      await reloadData();
      isLoading.value = true;
      return true;
    }
    return false;
  }

  async function reloadData() {
    const response = await fetchWrapper.get(
      `sls/report/InvoiceSummary`,
      null,
      true
    );
    data.value = response.data.data;
  }

  return {
    data,

    loadData,
    reloadData,
    isLoading,
  };
}
