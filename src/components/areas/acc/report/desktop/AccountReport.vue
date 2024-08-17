<template>
  <q-card bordered>
    <card-title :title="title" />

    <q-card-section class="q-px-none">
      <data-grid
        ref="dataGrid"
        :grid-store="gridStore"
        separator="horizontal"
        :data-source="dataSource"
        flat
        toolbar
        expandable
      >
        <template #cell-credit="{ item }">
          {{ item.credit?.toLocaleString() }}
        </template>

        <template #cell-debit="{ item }">
          {{ item.debit?.toLocaleString() }}
        </template>

        <template #cell-debitRemained="{ item }">
          {{ item.debitRemained?.toLocaleString() }}
        </template>

        <template #cell-creditRemained="{ item }">
          {{ item.creditRemained?.toLocaleString() }}
        </template>

        <template #expand="{ item }">
          <div class="q-mb-sm">
            <preview :item="item" inside />
          </div>
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
    title: String,
    dataSource: String,
  });

  const dataGrid = ref(null);

  const tableStore = computed(() => dataGrid.value?.tableStore);

  async function reloadData() {
    await tableStore.value.reloadData();
  }

  defineExpose({
    tableStore,
  });
</script>
