<template>
  <q-card bordered>
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <q-avatar
          rounded
          text-color="white"
          size="md"
          icon="o_reorder"
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
        :data-source="dataSource"
        flat
        expandable
        toolbar_
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
  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";

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
