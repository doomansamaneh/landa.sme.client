<template>
  <data-grid
    toolbar
    base-route="acc/fiscalYear"
    data-source="acc/fiscalYear/getGridData"
    :title="$t('main-menu-items.Acc_FiscalYear_View')"
    :visible-columns="columns"
  >
    <template #cell-title="{ item }">
      {{ item.title }}
      <span class="text-caption">
        ({{ item.fromDate?.substring(0, 10) }} -
        {{ item.toDate?.substring(0, 10) }})
      </span>
    </template>
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["title", "isActive", "actions"];
</script>
