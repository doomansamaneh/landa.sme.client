import { ref } from "vue";
import { defaultPageSize, sortOrder } from "src/constants";
import { baseInfoColumns } from "./constants";
import { useComposables } from "src/stores/useComposables";

export function useBaseInfoGrid(config) {
  const state = config.state ?? {
    firstLoad: ref(false),
    rows: ref([]),
    allSelectedIds: ref([]),
    activeRow: ref(null),
  };

  const composablesStore = useComposables();
  composablesStore.registerComposable({
    reset: () => {
      state.firstLoad.value = false;
    },
  });

  const pagination =
    config?.pagination ??
    ref({
      currentPage: 1,
      pageSize: defaultPageSize,
      sortColumn: config?.sortColumn ?? "title",
      sortOrder: config?.sortOrder ?? sortOrder.ascending,
      searchModel: config?.searchModel,
      filterExpression: config?.filterExpression ?? [],
    });

  const columns = ref(config?.columns ?? baseInfoColumns);

  if (config?.visibleColumns)
    columns.value = columns.value.filter((column) =>
      config.visibleColumns.includes(column.name)
    );

  return {
    columns,
    pagination,
    state,
    filterExpression: config?.filterExpression ?? [],
  };
}
