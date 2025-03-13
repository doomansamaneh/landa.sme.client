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
            <div class="text-body2">جستجو</div>
          </div>
        </q-btn>
      </template>
    </q-input>
  </div>

  <tip-banner />

  <data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
    base-route="sls/report/productStock"
    expandable
  />
</template>

<script setup>
  import { computed, ref } from "vue";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import TipBanner from "../shared/TipBanner.vue";

  const props = defineProps({
    gridStore: Object,
    dataSource: String,
    title: String,
  });

  const dataGrid = ref(null);
  const search = ref("");

  const tableStore = computed(() => dataGrid?.value?.tableStore);

  defineExpose({
    tableStore,
  });
</script>
