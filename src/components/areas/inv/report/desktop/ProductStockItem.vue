<template>
  <data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
    separator="horizontal"
    flat
    numbered
    wrapCells
    dense
    toolbar
    expandable
    :no-fullscreen="noFullscreen"
  >
    <template #cell-purchaseQuantity="{ item }">
      {{ helper.formatNumber(item.purchaseQuantity) }}
    </template>
    <template #cell-salesQuantity="{ item }">
      {{ helper.formatNumber(item.salesQuantity) }}
    </template>
    <template #cell-inlineQuantity="{ item }">
      <span class="text-weight-600">
        {{ helper.formatNumber(item.inlineQuantity) }}
      </span>
    </template>
    <template #cell-price="{ item }">
      {{ helper.formatNumber(item.price) }}
    </template>

    <template #expand="{ item }">
      <voucher-preview
        :voucher-id="item.voucherId"
        :voucher-item-id="item.id"
        inside
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import VoucherPreview from "src/components/areas/acc/voucher/shared/preview/IndexView.vue";

  const props = defineProps({
    dataSource: String,
    gridStore: Object,
    noFullscreen: Boolean,
  });

  const dataGrid = ref(null);
  const tableStore = computed(() => dataGrid?.value?.tableStore);

  defineExpose({
    tableStore,
  });
</script>
