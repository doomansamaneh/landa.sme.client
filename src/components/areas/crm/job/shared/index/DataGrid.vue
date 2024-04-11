<template>
  <data-grid
    toolbar
    base-route="crm/job"
    data-source="crm/job/getGridData"
    :title="$t('main-menu-items.Crm_Job_View')"
    :visible-columns="columns"
  >
  </data-grid>
</template>

<script setup>
import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

const columns = ["code", "title", "isActive", "actions"];
</script>
