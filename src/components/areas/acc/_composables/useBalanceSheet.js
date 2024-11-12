import { ref, onMounted, onUnmounted, computed } from "vue";
import { fetchWrapper, bus, helper } from "src/helpers";

export function useBalanceSheet() {
  const model = ref({ reviewItems: [] });

  async function loadData() {
    const response = await fetchWrapper.get(
      `acc/report/balanceSheet`,
      [],
      true
    );
    model.value = response.data.data;
  }

  onMounted(() => {
    loadData();
    bus.on("render-page", loadData);
  });

  onUnmounted(() => {
    bus.off("render-page", loadData);
  });

  return {
    model,
  };
}
