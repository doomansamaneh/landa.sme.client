<template>
  <lookup-view
    dataSource="trs/cash/getlookupData"
    sortColumn="title"
    textTemplate="{{ title }}"
    columns="title,amount"
    :filterExpression="filterExpression"
    ref="lookup"
  >
    <template #cell-amount="{ item }">
      {{ item.amount?.toLocaleString() }}
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
