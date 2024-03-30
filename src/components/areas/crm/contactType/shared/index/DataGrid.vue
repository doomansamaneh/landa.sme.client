<template>
  <data-grid
    toolbar
    base-route="crm/contactType"
    data-source="crm/contactType/getGridData"
    :title="$t('main-menu-items.Crm_ContactType_View')"
    :columns="columns"
  >
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["title", "isActive", "actions"];
</script>
