<template>
  <template v-if="$q.screen.lt.sm">
    <mobile
      :title="title"
      :grid-store="localGridStore"
      :crud-store="crudStore"
      :data-source="dataSource"
      :base-route="baseRoute"
      :expandable="expandable"
      ref="mobileGrid"
    >
      <template v-for="(slot, name) in $slots" :key="slot" #[name]="{ item }">
        <slot :name="name" :item="item"></slot>
      </template>
    </mobile>
  </template>

  <template v-else>
    <desktop
      :title="title"
      :grid-store="localGridStore"
      :crud-store="crudStore"
      :data-source="dataSource"
      :base-route="baseRoute"
      :expandable="expandable"
      ref="desktopGrid"
    >
      <template v-for="(slot, name) in $slots" :key="slot" #[name]="{ item }">
        <slot :name="name" :item="item"></slot>
      </template>
    </desktop>
  </template>
</template>

<script setup>
import { ref, computed } from "vue";
import { useReportGrid } from "src/components/areas/_shared/_composables/useReportGrid";
import { useFormActions } from "src/composables/useFormActions";

import Desktop from "src/components/areas/_shared/report/desktop/index/DataGrid.vue";
import Mobile from "src/components/areas/_shared/report/mobile/index/DataGrid.vue";

const props = defineProps({
  toolbar: Boolean,
  title: String,
  baseRoute: String,
  dataSource: String,
  createUrl: String,
  gridStore: Object,
  columns: Array,
  visibleColumns: Array,
  sortColumn: String,
  expandable: Boolean,
});

const localGridStore =
  props.gridStore ??
  useReportGrid({
    columns: props.columns,
    visibleColumns: props.visibleColumns,
    sortColumn: props.sortColumn,
  });
const crudStore = useFormActions(props.baseRoute);
const desktopGrid = ref(null);
const mobileGrid = ref(null);

const tableStore = computed(
  () => desktopGrid?.value?.tableStore ?? mobileGrid?.value?.tableStore
);

defineExpose({
  tableStore,
});
</script>
