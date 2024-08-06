import { ref, computed, onMounted, onUnmounted } from "vue";
import { fetchWrapper, bus, helper } from "src/helpers";

export function useBankAccount(action) {
  const model = ref([]);

  async function loadData() {
    const response = await fetchWrapper.post(
      `acc/report/${action}`,
      [],
      true
    );
    model.value = response.data.data;
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
  };
}
