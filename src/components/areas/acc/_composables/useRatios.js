import { ref, onMounted, onUnmounted } from "vue";
import { fetchWrapper, bus } from "src/helpers";

const model = ref({});

export function useRatios() {
  async function loadData() {
    const response = await fetchWrapper.get(
      `acc/report/getRatios`,
      null,
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
