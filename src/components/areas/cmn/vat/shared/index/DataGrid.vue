<template>
  <data-grid
    toolbar
    base-route="cmn/vat"
    data-source="cmn/vat/getGridData"
    :title="$t('main-menu-items.Cmn_Vat_View')"
    :visible-columns="columns"
  >
    <template #cell-title="{ item }">
      {{ item.title }}
      <span v-if="item.rate" class="text-weight-700">
        ({{ item.rate?.toLocaleString() }})
      </span>
    </template>
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["title", "isActive", "actions"];
</script>
