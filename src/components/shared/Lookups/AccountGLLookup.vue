<template>
  <lookup-view
    dataSource="acc/accountGL/getlookupData"
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
import HeaderColumn from "src/components/shared/lookups/HeaderColumn.vue";

const props = defineProps({
  filterExpression: Array,
});

const lookup = ref(null);

defineExpose({
  lookup,
});
</script>
