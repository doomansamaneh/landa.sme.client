import { ref } from "vue"
import { defaultPageSize, sortOrder, sqlOperator } from "src/constants";

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
  pageSize: defaultPageSize,
  sortColumn: "code",
  sortOrder: sortOrder.ascending,
  totalItems: 0,
  searchTerm: "",
  searchModel: "",
  filterExpression: []
})

const columns = ref([

  {
    name: "code",
    field: "code",
    sortable: false,
    operator: sqlOperator.like,
    value: "",
  },
  {
    name: "title",
    field: "title",
    sortable: false,
    value: "",
  },
])

export function useProduct() {
  const reset = () => {
    state.firstLoad.value = false
    setDefaultSearchModel()
  }

  const setDefaultSearchModel = () => {
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
