<template>
  <q-card bordered>
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <q-avatar
          rounded
          text-color="white"
          size="md"
          icon="o_group"
          class="primary-gradient primary-shadow"
        />
        <card-title v-if="title" :title="title" />
      </div>
      <data-grid-toolbar
        class="q-pa-md"
        :table-store="tableStore"
        :baseRoute="baseRoute"
      />
    </div>

    <q-separator size="1px" />

    <data-grid
      ref="dataGrid"
      :grid-store="gridStore"
      separator="horizontal"
      :data-source="dataSource"
      flat
      toolbar_
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
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";

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
