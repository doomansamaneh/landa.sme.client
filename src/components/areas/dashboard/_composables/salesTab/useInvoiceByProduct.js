import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { helper, fetchWrapper, bus } from "src/helpers";
import { useComposables } from "src/stores/useComposables";

export function useInvoiceByProduct({ dataSource, dataStore }) {
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
      dataSource ?? `sls/report/InvoiceByProduct`,
      null,
      true
    );
    showLoader.value = false;
    state.value.data.value = response.data.data;
  }

  const chartSeries = computed(() => [
    {
      name: "محصول",
      data: state.value.data?.value?.map((item) => item.amount) ?? [],
    },
  ]);

  const chartCategories = computed(
    () => state.value.data?.value?.map((item) => item.label) ?? []
  );

  return {
    chartSeries,
    chartCategories,

    loadData,
    reloadData,
    showLoader,
  };
}
