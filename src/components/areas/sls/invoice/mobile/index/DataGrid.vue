<template>
  <data-grid :table-store="tableStore" base-route="sls/invoice">
    <template #item-sheet-items="{ item }">
      <item-sheet
        :table-store="tableStore"
        :item="item"
        base-route="sls/invoice"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import DataGrid from "../../../_shared/invoice/mobile/index/DataGrid.vue";
  import ItemSheet from "./DataGridItemSheet.vue";
</script>
