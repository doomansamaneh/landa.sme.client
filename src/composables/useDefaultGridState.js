import { ref } from "vue";
import { sortOrder } from "src/constants";

export function useDefaultGridState({ sortColumn, sortColumnOrder }) {
  const rows = ref([]);

  const state = {
    disableApplySearch: true,
    firstLoad: ref(false),
    rows: ref([]),
    allSelectedIds: ref([]),
    activeRow: ref(null),
    searchModel: ref(null),
  };

  const pagination = ref({
    currentPage: 1,
    pageSize: 10,
    searchTerm: "",
    sortColumn: sortColumn ?? "",
    sortOrder: sortColumnOrder ?? sortOrder.ascending,
    totalItems: 0,
  });

  const reset = () => {
    state.firstLoad.value = false;
    pagination.value.currentPage = 1;
  };

  return {
    rows,
    pagination,
    state,
    reset,
  };
}
