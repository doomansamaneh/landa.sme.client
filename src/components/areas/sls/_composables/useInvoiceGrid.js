import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import { defaultPageSize, sortOrder, sqlOperator } from "src/constants";
import { useComposables } from "src/stores/useComposables";

//const rows = ref([])

const state = {
  firstLoad: ref(false),
  rows: ref([]),
  allSelectedIds: ref([]),
  activeRow: ref(null),
  summaryData: ref(null),
  searchModel: ref({
    dateRange: 0,
    waitToSendTax: false,
  }),
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
  sortColumn: "no",
  sortOrder: sortOrder.descending,
  totalItems: 0,
  searchTerm: "",
  searchModel: "",
  filterExpression: [],
});

const columns = ref([
  {
    name: "no",
    field: "no",
    sortable: true,
    label: "شماره",
    class: "text-left",
    cellClass: "text-left",
    cellStyle: "",
    style: "width:100px;",
    showFilter: true,
    operator: sqlOperator.equal,
    value: "",
  },
  {
    name: "date",
    field: "date",
    template: "{{dateString}}",
    sortable: true,
    label: "تاریخ",
    class: "text-left",
    style: "width:120px",
    showFilter: true,
  },
  {
    name: "customerName",
    field: "customerName",
    sortable: true,
    label: "مشتری",
    style: "",
    template: "{{customerCode}} {{customerName}}",
    showFilter: true,
    class: "text-left",
    value: "",
  },
  {
    name: "subject",
    field: "subject",
    sortable: true,
    label: "شرح",
    align: "left",
    class: "text-left",
    showFilter: true,
  },
  {
    name: "amount",
    field: "amount",
    sortable: true,
    label: "جمع کل",
    align: "left",
    class: "text-left",
    showFilter: true,
    style: "width:120px",
  },
  {
    name: "payedAmount",
    field: "payedAmount",
    sortable: true,
    label: "دریافت شده",
    align: "left",
    class: "text-left",
    style: "width:120px",
    showFilter: true,
  },
  {
    name: "remainedAmount",
    field: "remainedAmount",
    sortable: true,
    label: "مانده",
    align: "left",
    class: "text-left",
    style: "width:120px",
    showFilter: true,
  },
]);

export function useInvoiceGrid(defaultFilters) {
  const composablesStore = useComposables();
  const route = useRoute();

  composablesStore.registerComposable({
    reset: () => {
      state.firstLoad.value = false;
      setDefaultSearchModel();
    },
  });

  const filterExpression = defaultFilters ?? [];

  onMounted(() => {
    const remained = route.params.remained;
    if (remained === "remainedThisYear")
      filterExpression.push({
        fieldName: "Remained",
        operator: sqlOperator.equal,
        value: "thisYear",
      });
    else if (remained === "remainedAll")
      filterExpression.push({
        fieldName: "Remained",
        operator: sqlOperator.equal,
        value: "butThisYear",
      });
  });

  const setDefaultSearchModel = () => {
    state.searchModel.value = {
      dateRange: 0,
      waitToSendTax: false,
    };
  };

  return {
    //rows,
    columns,
    pagination,
    state,
    filterExpression,

    setDefaultSearchModel,
  };
}
