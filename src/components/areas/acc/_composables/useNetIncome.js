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
    return (
      model.value?.thisYear.find(
        (item) => item.clId === clTypeId
      ) || { debit: 0, credit: 0 }
    );
  };

  const getLastYear = (clTypeId) => {
    return (
      model.value?.lastYear.find(
        (item) => item.clId === clTypeId
      ) || { debit: 0, credit: 0 }
    );
  };

  const calculateAmount = (item, clId) =>
    [
      accountCLType.currentAsset,
      accountCLType.fixedAsset,
      accountCLType.expense,
      accountCLType.cogs,
    ].includes(clId)
      ? item.debit - item.credit
      : item.credit - item.debit;

  const getThisYearAmount = (clId) =>
    calculateAmount(getThisYear(clId), clId);
  const getLastYearAmount = (clId) =>
    calculateAmount(getLastYear(clId), clId);

  const getPercentAmount = (clId) => {
    const lastYearAmount = getLastYearAmount(clId);
    const thisYearAmount = getThisYearAmount(clId);
    if (lastYearAmount === 0) return thisYearAmount === 0 ? 0 : 100;
    return (
      ((thisYearAmount - lastYearAmount) / Math.abs(lastYearAmount)) *
      100
    );
  };

  // Use the "year" parameter to select the appropriate data source
  const computeNetIncome = (year) => {
    const getData = year === "thisYear" ? getThisYear : getLastYear;
    const revenue = calculateAmount(
      getData(accountCLType.revenue),
      accountCLType.revenue
    );
    const expense = calculateAmount(
      getData(accountCLType.expense),
      accountCLType.expense
    );
    return revenue - expense;
  };

  const thisYearNetIncome = computed(() =>
    computeNetIncome("thisYear")
  );
  const lastYearNetIncome = computed(() =>
    computeNetIncome("lastYear")
  );

  // Compute net income percent change between this year and last year
  const netIncomePercent = computed(() => {
    const lastNI = lastYearNetIncome.value;
    const thisNI = thisYearNetIncome.value;
    if (lastNI === 0) return thisNI === 0 ? 0 : 100;
    return ((thisNI - lastNI) / Math.abs(lastNI)) * 100;
  });

  const thisYearRevenue = computed(() => {
    return calculateAmount(
      getThisYear(accountCLType.revenue),
      accountCLType.revenue
    );
  });

  const revenuePercent = computed(() => {
    const lastYearRevenue = calculateAmount(
      getLastYear(accountCLType.revenue),
      accountCLType.revenue
    );
    if (lastYearRevenue > 0) {
      return (
        ((thisYearRevenue.value - lastYearRevenue) /
          lastYearRevenue) *
        100
      );
    }
    return 100;
  });

  const clItems = computed(() =>
    [...model.value?.thisYear, ...model.value?.lastYear]
      .map(({ clId, clTypeId, clCode, clTitle }) => ({
        clId,
        clTypeId,
        clCode,
        clTitle,
      }))
      .sort((a, b) => a.clCode?.localeCompare(b.clCode))
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (c) =>
              c.clId === value.clId && c.clTypeId === value.clTypeId
          )
      )
  );

  const chartSeries = computed(() => {
    return [
      {
        name: "revenue",
        data: [
          getLastYearAmount(accountCLType.revenue),
          getThisYearAmount(accountCLType.revenue),
        ],
      },
    ];
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
    clItems,
    chartSeries,
    thisYearRevenue,
    revenuePercent,
    thisYearNetIncome,
    lastYearNetIncome,
    netIncomePercent,
    getThisYearAmount,
    getLastYearAmount,
    getPercentAmount,
  };
}
