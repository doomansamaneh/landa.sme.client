import { ref, computed, onMounted, onUnmounted } from "vue";
import { fetchWrapper, bus } from "src/helpers";
import { accountCLType } from "src/constants";

const model = ref({ thisYear: [{}], lastYear: [{}] });

export function useNetIncome() {
  async function loadData() {
    const response = await fetchWrapper.get(
      `acc/report/revenueExpense`,
      null,
      true
    );
    model.value = response.data.data;
  }

  const getThisYear = (clTypeId) => {
    const defaultItem = { debit: 0, credit: 0 };
    return (
      model.value?.thisYear.find((item) => item.clId === clTypeId) ||
      defaultItem
    );
  };

  const getLastYear = (clTypeId) => {
    const defaultItem = { debit: 0, credit: 0 };
    return (
      model.value?.lastYear.find((item) => item.clId === clTypeId) ||
      defaultItem
    );
  };

  const chartSeries = computed(() => {
    const thisYear = getThisYear(accountCLType.revenue);
    const lastYear = getLastYear(accountCLType.revenue);

    return [
      {
        name: "revenue",
        data: [
          lastYear.credit - lastYear.debit,
          thisYear.credit - thisYear.debit,
        ],
      },
    ];
  });

  const thisYearRevenue = computed(() => {
    const thisYear = getThisYear(accountCLType.revenue);
    return thisYear.credit - thisYear.debit;
  });

  const revenuePercent = computed(() => {
    const thisYear = getThisYear(accountCLType.revenue);
    const lastYear = getLastYear(accountCLType.revenue);
    if (lastYear.credit - lastYear.debit > 0)
      return (
        ((thisYear.credit -
          thisYear.debit -
          (lastYear.credit - lastYear.debit)) /
          (lastYear.credit - lastYear.debit)) *
        100
      );
    return 100;
  });

  onMounted(() => {
    loadData();
    bus.on("render-page", loadData);
  });

  onUnmounted(() => {
    bus.off("render-page", loadData);
  });

  return {
    model,
    chartSeries,
    thisYearRevenue,
    revenuePercent,
  };
}
