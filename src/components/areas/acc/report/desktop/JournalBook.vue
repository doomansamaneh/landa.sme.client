<template>
  <q-card bordered>
    <card-title :title="title" />

    <q-card-section class="q-px-none">
      <data-grid
        ref="dataGrid"
        :grid-store="gridStore"
        :data-source="dataSource"
        flat
        expandable
        toolbar
      >
        <template #cell-debit="{ item }">
          {{ item.debit?.toLocaleString() }}
        </template>

        <template #cell-credit="{ item }">
          {{ item.credit?.toLocaleString() }}
        </template>

        <template #expand="{ item }">
          <preview :item="item" inside />
        </template>
      </data-grid>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed, ref } from "vue";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "./AccountPreview.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    gridStore: Object,
    dataSource: String,
    title: String,
  });

  const dataGrid = ref(null);

  const tableStore = computed(() => dataGrid.value?.tableStore);

  defineExpose({
    tableStore,
  });
</script>
