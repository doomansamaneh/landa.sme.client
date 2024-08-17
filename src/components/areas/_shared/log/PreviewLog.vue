<template>
  <mobile-log v-if="$q.screen.xs" :table-store="tableStore" />
  <desktop-log
    v-else
    bordered
    :items="logItems"
    :entity-id="entityId"
    :entity-name="entityName"
    :call-back="loadData"
  />
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import { sqlOperator, sortOrder, logType } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import DesktopLog from "./_DesktopLog.vue";
  import MobileLog from "./_MobileLog.vue";
  import { helper } from "src/helpers";

  const props = defineProps({
    entityName: String,
    entityId: String,
  });

  const logStore = {
    state: {
      disableApplySearch: true,
      firstLoad: ref(false),
      rows: ref([]),
      allSelectedIds: ref([]),
      activeRow: ref(null),
    },
    pagination: ref({
      currentPage: 1,
      pageSize: 10,
      sortColumn: "logTime",
      sortOrder: sortOrder.descending,
      totalItems: 0,
      searchTerm: "",
    }),
  };
  const logTableStore = useDataTable({
    dataSource: "cmn/entitylog/getGridData",
    store: logStore,
  });
  logTableStore.setFilterExpression([
    {
      fieldName: "entityId",
      operator: sqlOperator.equal,
      value: props.entityId,
    },
    {
      fieldName: "entityName",
      operator: sqlOperator.equal,
      value: props.entityName,
    },
  ]);

  const noteStore = {
    state: {
      disableApplySearch: true,
      firstLoad: ref(false),
      rows: ref([]),
      allSelectedIds: ref([]),
      activeRow: ref(null),
    },
    pagination: ref({
      currentPage: 1,
      pageSize: 10,
      sortColumn: "dateCreated",
      sortOrder: sortOrder.descending,
      totalItems: 0,
      searchTerm: "",
    }),
  };
  const noteTableStore = useDataTable({
    dataSource: "cmn/entityNote/getGridData",
    store: noteStore,
  });
  noteTableStore.setFilterExpression([
    {
      fieldName: "entityId",
      operator: sqlOperator.equal,
      value: props.entityId,
    },
  ]);

  const logItems = computed(() => {
    const notes = noteTableStore.rows.value.map((item) => {
      return {
        id: item.id,
        logType: logType.comment,
        comment: item.comment,
        logTime: item.dateCreated,
        logUser: item.createdBy,
      };
    });
    const items = [...logTableStore.rows.value, ...notes];
    return items.sort(
      (a, b) =>
        helper.dateToNumber(helper.parseDateString(b.logTime)) -
        helper.dateToNumber(helper.parseDateString(a.logTime))
    );
  });

  const loadData = async () => {
    noteTableStore.reloadData();
    logTableStore.reloadData();
  };

  onMounted(() => {
    loadData();
  });
</script>
