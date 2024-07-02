<template>
  <lookup-view
    ref="lookup"
    dataSource="sls/invoice/getDocLookupData"
    sortColumn="no"
    textTemplate="{{ no }} - {{ customerName }}"
    searchField="no"
    columns="no,customerName,subject"
  />
</template>

<script setup>
  import { ref } from "vue";

  import LookupView from "src/components/shared/dataTables/LookupView.vue";

  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
