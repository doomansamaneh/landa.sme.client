import { ref } from "vue";
import { defaultPageSize, sortOrder } from "src/constants";
import { useComposables } from "src/stores/useComposables";

export function useBaseInfoGrid(visibleColumns) {
  const composablesStore = useComposables();
  composablesStore.registerComposable({
    reset: () => {
      state.firstLoad.value = false;
    },
  });

  const state = {
    firstLoad: ref(false),
    rows: ref([]),
    allSelectedIds: ref([]),
    activeRow: ref(null),
  };

  const pagination = ref({
    currentPage: 1,
    pageSize: defaultPageSize,
    sortColumn: "title",
    sortOrder: sortOrder.ascending,
    totalItems: 0,
    searchTerm: "",
    searchModel: "",
    filterExpression: [],
  });

  const columns = ref([
    {
      name: "code",
      field: "code",
      sortable: true,
      label: "کد",
      style: "",
      showFilter: true,
      class: "text-left",
      value: "",
    },
    {
      name: "title",
      field: "title",
      sortable: true,
      label: "عنوان",
      style: "",
      showFilter: true,
      class: "text-left",
      value: "",
    },
    {
      name: "isActive",
      field: "isActive",
      sortable: true,
      label: "فعال",
      align: "left",
      class: "text-left",
      style: "width:120px;",
      showFilter: true,
    },
    {
      name: "actions",
      field: "",
      sortable: false,
      label: "",
      align: "left",
      class: "text-left",
      style: "width:170px;",
      showFilter: false,
    },
  ]);

  if (visibleColumns)
    columns.value = columns.value.filter((column) =>
      visibleColumns.includes(column.name)
    );

  return {
    //rows,
    columns,
    pagination,
    state,
  };
}
