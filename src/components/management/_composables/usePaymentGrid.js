import { ref } from "vue"

const rows = ref([])

const state = {
  firstLoad: ref(false),
  rows: ref([]),
  allSelectedIds: ref([]),
  activeRow: ref(null),
  summaryData: ref(null),
  searchModel: ref(null)
}

const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  sortColumn: "toDate",
  searchField: "amount",
  sortOrder: 1,
  totalItems: 0,
  searchTerm: "",
  searchModel: "",
  filterExpression: []
})

const columns = ref([

  {
    name: "amount",
    field: "amount",
  },
  {
    name: "businessTitle",
    field: "businessTitle",
  },
  {
    name: "fromDate",
    field: "fromDate",
  },
  {
    name: "toDate",
    field: "toDate",
  }

])

export function usePaymentGrid() {
  const reset = () => {
    state.firstLoad.value = false
    setDefaultSearchModel()
  }

  const setDefaultSearchModel = () => {
    state.searchModel.value = {}
  }

  return {
    rows,
    columns,
    pagination,
    state,

    setDefaultSearchModel,
    reset
  }
}
