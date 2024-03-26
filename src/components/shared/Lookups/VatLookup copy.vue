<template>
  <lookup-view
    ref="lookup"
    dataSource="cmn/vat/getlookupData"
    orderByField="title"
    textTemplate="{{ title }}"
    columns="title"
    :filterExpression="filterExpression"
  />
</template>

<script setup>
import LookupView from "src/components/shared/dataTables/LookupView.vue";

const props = defineProps({
  filterExpression: Array,
});

const lookup = ref(null);

defineExpose({
  lookup,
});
</script>
