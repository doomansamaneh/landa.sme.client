<template>
  <report
    :title="$t('main-menu-items.Acc_Report_CustomerAccounting')"
    :grid-store="gridStore"
  />
</template>

<script setup>
  import Report from "./AccountReport.vue";

  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useCustomerAcccountState } from "src/components/areas/acc/_composables/useCustomerAcccountState";

  const accountStore = useCustomerAcccountState();
  const gridStore = useBaseInfoGrid(accountStore);
</script>
