<template>
  <data-grid
    toolbar
    base-route="cmn/productUnit"
    data-source="cmn/productUnit/getGridData"
    :title="$t('main-menu-items.Cmn_ProductUnit_View')"
    activation
  >
    <template #cell-code="{ item }">
      {{ item.code }}
      <div v-if="item.taxCode">
        <small>
          {{ $t("shared.labels.taxCode") }}: {{ item.taxCode }}
        </small>
      </div>
    </template>
  </data-grid>
</template>

<script setup>
  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
</script>
