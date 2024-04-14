<template>
  <lookup-view
    dataSource="cmn/bankBranch/getlookupData"
    sortColumn="title"
    textTemplate="{{bankTitle}} / {{ title }}"
    columns="code,title"
    :filterExpression="filterExpression"
    ref="lookup"
  >
    <template #cell-title="{ item }">
      {{ item.bankTitle }} / {{ item.title }}
    </template>
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
