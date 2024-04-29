<template>
  <data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
    separator="horizontal"
    flat_
    multiSelect_
    numbered
    bordered
    wrapCells_
    dense_
    :expandable="expandable"
  >
    <template #filter-isActive="{ col }">
      <custom-select
        v-model="col.value"
        :options="isActiveOptions"
        @update:model-value="reloadData"
      />
    </template>

    <template #cell-isActive="{ item }">
      <is-active :is-active="item.isActive" />
    </template>

    <template v-for="(slot, name) in $slots" :key="slot" #[name]="{ item }">
      <slot :name="name" :item="item"></slot>
    </template>

    <template #cell-actions="{ item }">
      <row-tool-bar
        :base-route="baseRoute"
        :item="item"
        :table-store="tableStore"
        :crud-store="crudStore"
      />
    </template>
  </data-grid>
</template>

<script setup>
import { ref, computed } from "vue";
import { isActiveOptions } from "src/constants";

import RowToolBar from "src/components/shared/RowToolBar.vue";
import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
import IsActive from "src/components/shared/IsActive.vue";

const props = defineProps({
  gridStore: Object,
  crudStore: Object,
  dataSource: String,
  baseRoute: String,
  expandable: Boolean,
});

const dataGrid = ref(null);

async function reloadData() {
  await tableStore.value.reloadData();
}

const tableStore = computed(() => dataGrid?.value?.tableStore);

defineExpose({
  tableStore,
});

</script>
