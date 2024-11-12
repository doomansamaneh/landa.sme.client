import { ref, onMounted, onUnmounted, computed } from "vue";
import { helper, fetchWrapper, bus } from "src/helpers";
import { useComposables } from "src/stores/useComposables";

export function useRevenueExpense({ dataSource, dataStore }) {
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
    const response = await fetchWrapper.get(
      dataSource ?? `acc/report/RevenueExpenseByMonth`,
      null,
      true
    );
    showLoader.value = false;
    state.value.data.value = response.data.data;
  }

  const chartSeries = computed(() =>
    state.value.data?.value?.map((item) => ({
      name: item.name,
      data: item.data.map((subItem) => subItem.amount),
    }))
  );

  const chartExpenseSeries = computed(() => [
    chartSeries.value?.find((series) => series.name === "expense"),
  ]);

  const chartRevenueSeries = computed(() => [
    chartSeries.value?.find((series) => series.name === "revenue"),
  ]);
  //const chartExpenseSeries = computed(() => chartSeries.value[1]);

  const tableSeries = computed(() => {
    let series = [];
    state.value.data?.value?.forEach((row) => {
      // Clone the row to avoid modifying the original item
      let newRow = { ...row };
      newRow.data = [...row.data];

      series.push(newRow);
      newRow.data.push({
        label: "total",
        amount: helper.getSubtotal(row.data, "amount"),
      });
    });

    return series;
  });

  return {
    tableSeries,
    chartSeries,
    chartExpenseSeries,
    chartRevenueSeries,

    loadData,
    reloadData,
    showLoader,
  };
}
