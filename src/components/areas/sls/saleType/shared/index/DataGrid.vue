<template>
  <data-grid
    base-route="sls/saleType"
    data-source="sls/saleType/getGridData"
    :title="$t('main-menu-items.Sls_SaleType_View')"
    icon="subject"
    :visible-columns="columns"
    create-url="/sls/saleType/create"
  >
    <template #cell-title="{ item }">
      <is-by-system :is-by-system="item.isBySystem" />
      {{ item.title }}
    </template>
  </data-grid>
</template>

<script setup>
  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
  import IsBySystem from "src/components/shared/IsBySystem.vue";

  const columns = ["title", "isActive", "actions"];
</script>
