import { ref, onMounted, onUnmounted, computed } from "vue";
import { fetchWrapper, bus, helper } from "src/helpers";

const showLoader = ref(false);

export function useIncomeStatement() {
  const model = ref({ reviewItems: [] });

  async function loadData() {
    showLoader.value = true;
    try {
      const response = await fetchWrapper.get(
        `acc/report/incomeStatement`,
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
        `acc/report/incomeStatementSLByGL/${item.id}`,
        [],
        true
      );
      item.items = response.data.data;
    }
  }

  const accountClCodes = computed(() => {
    // Step 1: Map to the desired properties
    let items = model.value.reviewItems.map((c) => ({
      clTypeId: c.clTypeId,
      clCode: c.clCode,
      clTitle: c.clTitle,
    }));

    // Step 2: Sort by CLCode
    items.sort((a, b) => {
      if (a.clCode < b.clCode) return -1;
      if (a.clCode > b.clCode) return 1;
      return 0;
    });

    // Step 3: Remove duplicates (Distinct)
    const seen = new Set();
    items = items.filter((item) => {
      const duplicate = seen.has(item.clCode);
      seen.add(item.clCode);
      return !duplicate;
    });

    return items;
  });

  const getFilteredItems = (clCode) => {
    // Step 1: Filter by CLCode
    let items = model.value.reviewItems.filter(
      (c) => c.clCode === clCode
    );

    // Step 2: Sort by GLCode
    items.sort((a, b) => {
      if (a.glCode < b.glCode) return -1;
      if (a.glCode > b.glCode) return 1;
      return 0;
    });
    return items;
  };

  const totalIcome = computed(
    () =>
      helper.getSubtotal(model.value.reviewItems, "credit") -
      helper.getSubtotal(model.value.reviewItems, "debit")
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
    showLoader,
    accountClCodes,
    totalIcome,
    getFilteredItems,
    loadSLData,
  };
}
