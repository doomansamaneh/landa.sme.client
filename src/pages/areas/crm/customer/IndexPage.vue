<template>
  <mobile
    v-if="$q.screen.xs"
    :grid-store="gridStore"
    :title="$t('main-menu-items.Crm_Customer_View')"
  />

  <desktop
    v-else
    :grid-store="gridStore"
    toolbar
    :title="$t('main-menu-items.Crm_Customer_View')"
  />
</template>

<script setup>
import { ref } from "vue";

import Desktop from "src/components/areas/crm/customer/desktop/index/DataGrid.vue";
import Mobile from "src/components/areas/crm/customer/mobile/index/DataGrid.vue";

import { useCustomerGrid } from "src/components/areas/crm/_composables/useCustomerGrid";

const gridStore = useCustomerGrid();
</script>
