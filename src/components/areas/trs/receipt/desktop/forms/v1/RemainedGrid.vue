<template>
  <data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
    separator="horizontal"
    multiSelect
    numbered
    bordered
    wrapCells
  >
    <template #cell-subject="{ item }">
      <div>{{ item.subject }}</div>
      <div v-if="item.summary" class="text-caption-sm">
        {{ item.summary }}
      </div>
      <div class="q-gutter-x-sm">
        <q-badge class="primary-gradient">
          {{ item.typeTitle }}
        </q-badge>
        <q-badge
          text-color="white"
          class="bluegrey-gradient"
          v-if="item.contractTitle"
        >
          {{ item.contractTitle }}
          <q-tooltip
            class="custom-tooltip text-body1 no-letter-spacing"
          >
            قرارداد
          </q-tooltip>
        </q-badge>
      </div>
    </template>

    <template #cell-amount="{ item }">
      {{ item.amount?.toLocaleString() }}
    </template>

    <template #cell-payedAmount="{ item }">
      {{ item.payedAmount?.toLocaleString() }}
    </template>

    <template #cell-remainedAmount="{ item }">
      {{ item.remainedAmount?.toLocaleString() }}
    </template>
  </data-grid>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { sortOrder } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { invoiceRemainedColumns } from "src/components/areas/sls/_composables/constants";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";

  const props = defineProps({
    customerId: String,
  });

  const dataGrid = ref(null);
  const gridStore = useBaseInfoGrid({
    columns: invoiceRemainedColumns,
    sortColumn: "no",
    sortOrder: sortOrder.descending,
  });

  async function reloadData() {
    await tableStore.value.reloadData();
  }

  const dataSource = computed(
    () => `sls/invoice/getRemainedData/${props.customerId}`
  );
  const tableStore = computed(() => dataGrid?.value?.tableStore);

  defineExpose({
    tableStore,
  });
</script>
