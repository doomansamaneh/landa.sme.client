import { ref, onMounted, onUnmounted, computed } from "vue";
import { helper, fetchWrapper, bus } from "src/helpers";
import { useComposables } from "src/stores/useComposables";

const firstLoad = ref(false);
const data = ref(null);
//const tableSeries = ref(null);
const showLoader = ref(false);

export function useRevenueExpense() {
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
      return true;
    }
    return false;
  }

  async function reloadData() {
    showLoader.value = true;
    const response = await fetchWrapper.get(
      `acc/report/RevenueExpenseByMonth`,
      null,
      true
    );
    showLoader.value = false;
    data.value = response.data.data;
  }

  const chartSeries = computed(() =>
    data?.value?.map((item) => ({
      name: item.name,
      data: item.data.map((subItem) => subItem.amount),
    }))
  );

  const tableSeries = computed(() => {
    let series = [];
    data?.value?.forEach((row) => {
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

    loadData,
    reloadData,
    showLoader,
  };
}
