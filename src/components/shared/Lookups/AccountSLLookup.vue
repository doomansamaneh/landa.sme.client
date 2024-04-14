<template>
  <lookup-view
    dataSource="acc/accountSL/getlookupData"
    textTemplate="{{code}} - {{ title }}"
    columns="code,title"
    sortColumn="code"
    :filterExpression="filterExpression"
    ref="lookup"
  >
  </lookup-view>
</template>

<script setup>
import { ref } from "vue";
import LookupView from "src/components/shared/dataTables/LookupView.vue";

const props = defineProps({
  filterExpression: Array,
});

const lookup = ref(null);

defineExpose({
  lookup,
});
</script>
