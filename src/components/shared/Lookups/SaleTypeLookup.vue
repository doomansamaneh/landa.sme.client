<template>
  <lookup-view
    dataSource="sls/saleType/getlookupData"
    orderByField="title"
    textTemplate="{{ title }}"
    columns="title"
    :filterExpression="filterExpression"
    ref="lookup"
  >
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
