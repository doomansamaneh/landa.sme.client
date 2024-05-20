<template>
  <div class="q-mt-sm">
    <data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
    separator="horizontal"
    flat_
    square_
    multiSelect_
    numbered
    bordered
    wrapCells
    dense_
    :expandable="true"
  >

    <template #cell-credit="{ item }">
      {{ item.credit?.toLocaleString() }}
    </template>

    <template #cell-debit="{ item }">
      {{ item.debit?.toLocaleString() }}
    </template>

    <template #cell-inlineDebit="{ item }">
      {{ item.inlineDebit?.toLocaleString() }}
    </template>

    <template #cell-debitRemained="{ item }">
      {{ item.debitRemained?.toLocaleString() }}
    </template>

    <template #cell-creditRemained="{ item }">
      {{ item.creditRemained?.toLocaleString() }}
    </template>

     <template #cell-voucherSubject="{ item }">
      {{ item.voucherSubject }}
      
      <div class="text-caption-sm" :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'" v-if="item.comment">
        {{ item.comment }}
      </div>

    </template>

  </data-grid>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";

  const props = defineProps({
    dataSource: String,
    gridStore: Object,
  });

  const dataGrid = ref(null);
  const tableStore = computed(() => dataGrid?.value?.tableStore);

  defineExpose({
    tableStore,
  });
  
</script>
