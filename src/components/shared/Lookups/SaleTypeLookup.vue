<template>
  <lookup-view
    dataSource="sls/saleType/getlookupData"
    sortColumn="title"
    textTemplate="{{ title }}"
    columns="title"
    :filterExpression="filterExpression"
    ref="lookup"
  >
    <template #title>نوع</template>
  </lookup-view>
</template>

<script setup>
  import { ref } from "vue";

  import LookupView from "src/components/shared/dataTables/LookupView.vue";

  const lookup = ref(null);

  const props = defineProps({
    filterExpression: Array,
  });

  defineExpose({
    lookup,
  });
</script>
