import { ref, onMounted, onUnmounted, computed } from "vue";
import { fetchWrapper, bus } from "src/helpers";
import { useComposables } from "src/stores/useComposables";
import { useAccess } from "src/directives/useAccess";

export function usePurchaseByProductGroup({ dataSource, dataStore }) {
  const { hasAccess } = useAccess();
  const _state = {
    firstLoad: ref(false),
    data: ref(null),
  };
  const showLoader = ref(false);
  const state = computed(() => dataStore?.state ?? _state);

  const composablesStore = useComposables();
  composablesStore.register({
    reset: () => {
      state.value.firstLoad.value = false;
    },
  });

  onMounted(() => {
    if (!hasAccess("sls.purchase.view")) return;

    loadData();
    bus.on("render-page", loadData);
  });

  onUnmounted(() => {
    bus.off("render-page", loadData);
  });

  async function loadData() {
    if (!state.value.firstLoad.value) {
      state.value.firstLoad.value = true;
      await reloadData();
      return true;
    }
    return false;
  }

  async function reloadData() {
    showLoader.value = true;
    const response = await fetchWrapper.post(
      dataSource ?? `sls/report/PurchaseByProductGroup`,
      null,
      true
    );
    showLoader.value = false;
    state.value.data.value = response.data.data;
  }

  const chartSeries = computed(
    () => state.value.data?.value?.map((item) => item.amount) ?? []
  );

  const chartLabels = computed(
    () => state.value.data?.value?.map((item) => item.label) ?? []
  );

  const total = computed(
    () =>
      state.value.data?.value?.reduce(
        (sum, item) => sum + item.amount,
        0
      ) ?? 0
  );

  return {
    chartSeries,
    chartLabels,
    total,
    showLoader,
    loadData,
    reloadData,
  };
}
