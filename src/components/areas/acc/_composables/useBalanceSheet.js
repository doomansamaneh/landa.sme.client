import { ref, onMounted, onUnmounted } from "vue";
import { fetchWrapper, bus } from "src/helpers";

const showLoader = ref(false);

export function useBalanceSheet() {
  const model = ref({ reviewItems: [] });

  async function loadData() {
    showLoader.value = true;

    try {
      const response = await fetchWrapper.get(
        `acc/report/balanceSheet`,
        [],
        true
      );
      model.value = response.data.data;
    } finally {
      showLoader.value = false;
    }
  }

  async function loadSLData(item) {
    if (!item.items) {
      const response = await fetchWrapper.get(
        `acc/report/balanceSLByGL/${item.glId}`,
        [],
        true
      );
      item.items = response.data.data;
    }
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
    showLoader,
    loadSLData,
  };
}
