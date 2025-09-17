import { ref, onMounted, onUnmounted, computed } from "vue";
import { helper, fetchWrapper, bus } from "src/helpers";
import { useAccess } from "src/directives/useAccess";
import { useComposables } from "src/stores/useComposables";

export function usePurchaseRevenueExpense({ dataSource, dataStore }) {
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
    if (!hasAccess("acc.report.accountReview")) return;

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

  const expenseTotal = computed(
    () =>
      chartExpenseSeries.value?.[0]?.data.reduce(
        (total, value) => total + value,
        0
      ) ?? 0
  );

  const chartRevenueSeries = computed(() => [
    chartSeries.value?.find((series) => series.name === "revenue"),
  ]);

  const revenueTotal = computed(
    () =>
      chartRevenueSeries.value?.[0]?.data.reduce(
        (total, value) => total + value,
        0
      ) ?? 0
  );

  const chartCategories = computed(
    () => state.value.data?.value?.map((item) => item.label) ?? []
  );

  return {
    expenseTotal,
    revenueTotal,
    chartSeries,
    chartExpenseSeries,
    chartRevenueSeries,
    chartCategories,
    loadData,
    reloadData,
    showLoader,
  };
}
