<template>
  <q-card bordered>
    <card-title :title="title" icon="o_group"></card-title>

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
        {{ helper.formatNumber(item.debit) }}
      </template>

      <template #cell-debitRemained="{ item }">
        {{ helper.formatNumber(item.debitRemained) }}
      </template>

      <template #cell-creditRemained="{ item }">
        {{ helper.formatNumber(item.creditRemained) }}
      </template>

      <template #expand="{ item }">
        <div class="q-mb-sm">
          <preview :item="item" inside />
        </div>
      </template>
    </data-grid>
  </q-card>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { helper } from "src/helpers";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "./AccountPreview.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  import CustomTab from "src/components/shared/CustomTab.vue";

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
