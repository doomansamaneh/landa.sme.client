<template>
  <data-grid :table-store="tableStore" base-route="sls/purchase">
    <template #item-sheet-items="{ item }">
      <sheet-items
        :item="item"
        :base-route="baseRoute"
        :table-store="tableStore"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import DataGrid from "../../../_shared/invoice/mobile/index/DataGrid.vue";
  import SheetItems from "./DataGridItemSheetItems.vue";
</script>
