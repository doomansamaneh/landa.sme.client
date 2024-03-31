<template>
  <data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
    :create-url="createUrl"
  >
    <template #body="{ item }">
      <q-card :class="tableStore?.getRowClass(item)">
        <q-card-section>
          <span
            class="q-mr-md"
            v-if="
              gridStore.columns.value.some((col) => col.name === 'isActive')
            "
          >
            <q-btn
              v-if="item.isActive"
              round
              dense
              size="10px"
              unelevated
              icon="o_done"
              color="positive"
              class="no-pointer-events"
            />
            <q-btn
              v-else
              round
              dense
              size="10px"
              unelevated
              icon="o_close"
              color="negative"
              class="no-pointer-events"
            />
          </span>
          <span v-if="item.code"> {{ item.code }} - </span>{{ item.title }}
          <div>
            <small class="">{{ item.comment }}</small>
          </div>
        </q-card-section>
      </q-card>
    </template>
  </data-grid>
</template>

<script setup>
import { ref, computed } from "vue";

import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue";

const props = defineProps({
  gridStore: Object,
  crudStore: Object,
  dataSource: String,
  baseRoute: String,
  createUrl: String,
});

const dataGrid = ref(null);

const tableStore = computed(() => dataGrid?.value?.tableStore);

defineExpose({
  tableStore,
});
</script>
