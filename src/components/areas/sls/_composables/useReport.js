import { ref, computed, onMounted, onUnmounted } from "vue";
import { fetchWrapper, bus, helper } from "src/helpers";

export function useReport(action) {
  const model = ref([]);
  const showLoader = ref(false);

  async function loadData() {
    showLoader.value = true;
    try {
      const response = await fetchWrapper.post(
        `sls/report/${action}`,
        [],
        true
      );
      model.value = response.data.data;
    } finally {
      showLoader.value = false;
    }
  }

  const chartSeries = computed(() =>
    model.value.map((item) => item.amount)
  );

  const chartLabels = computed(() =>
    model.value.map((item) => item.label)
  );

  const total = computed(() =>
    helper.getSubtotal(model.value, "amount")
  );

  onMounted(() => {
    loadData();
    bus.on("render-page", loadData);
  });

  onUnmounted(() => {
    bus.off("render-page", loadData);
  });

  return {
    model,
    chartLabels,
    chartSeries,
    total,
    showLoader,
  };
}
