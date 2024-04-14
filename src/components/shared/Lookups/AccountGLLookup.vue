<template>
  <lookup-view
    dataSource="acc/accountGL/getlookupData"
    sortColumn="code"
    textTemplate="{{ code }} - {{ title }}"
    columns="code,title"
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
