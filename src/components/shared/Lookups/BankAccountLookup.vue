<template>
  <lookup-view
    dataSource="trs/bankAccount/getlookupData"
    sortColumn="no"
    textTemplate="{{bankTitle}} / {{title}} /{{no}}"
    columns="no,bankTitle,amount"
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
