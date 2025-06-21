<template>
  <data-grid
    base-route="doc/contract"
    data-source="doc/contract/getGridData"
    :title="$t('main-menu-items.Doc_Contract_View')"
    :columns="contractColumns"
    sort-column="no"
    create-url="/contract/contract/create"
    expandable
  >
    <template #expand="{ item }">
      <preview
        inside
        :item="item"
        :base-route="baseRoute"
        :title="$t('main-menu-items.Doc_Contract_View')"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { contractColumns } from "../../../_composables/constants";

  import Preview from "../preview/IndexView.vue";
  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
</script>
