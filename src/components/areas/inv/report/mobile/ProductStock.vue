<template>
  <div class="q-pb-lg">
    <q-input
      outlined
      dense
      rounded
      placeholder="جستجو در موجودی کالا"
      v-model="search"
      @click="showSearchModal"
    >
      <template #append>
        <q-btn
          padding="4px 12px"
          rounded
          color="primary"
          dense
          unelevated
        >
          <div class="row items-center">
            <q-icon name="o_search" size="xs" class="q-mr-xs" />
            <div class="text-body2 no-letter-spacing">جستجو</div>
          </div>
        </q-btn>
      </template>
    </q-input>
  </div>

  <data-grid
    ref="dataGrid"
    :grid-store="gridStore"
    :data-source="dataSource"
    base-route="sls/report/productStock"
    expandable
  />
</template>

<script setup>
  import { computed, ref } from "vue";
  import { sqlOperator } from "src/constants";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";

  const search = ref("");

  const props = defineProps({
    gridStore: Object,
    title: String,
    dataSource: String,
    crudStore: Object,
  });

  const dataGrid = ref(null);

  const tableStore = computed(() => dataGrid.value?.tableStore);

  defineExpose({
    tableStore,
  });
</script>
