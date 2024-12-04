<template>
  <q-card bordered>
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <custom-tab
          behavior="heading"
          :title="title"
          icon="o_reorder"
        />
      </div>
    </div>

    <q-separator size="1px" />

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
  </q-card>
</template>

<script setup>
  import { computed, ref } from "vue";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "./AccountPreview.vue";
  import CustomTab from "src/components/shared/CustomTab.vue";

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
