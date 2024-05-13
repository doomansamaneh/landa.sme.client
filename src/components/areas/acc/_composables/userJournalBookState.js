import { ref } from "vue";
import { sortOrder, defaultPageSize } from "src/constants";
import { journalBookColumns } from "./constants";

const rows = ref([]);

const state = {
  firstLoad: ref(false),
  rows: ref([]),
  allSelectedIds: ref([]),
  activeRow: ref(null),
};

const pagination = ref({
  currentPage: 1,
  pageSize: defaultPageSize,
});

export function userJournalBookState() {
  const columns = journalBookColumns;
  return {
    rows,
    state,
    pagination,
    columns,
  };
}
