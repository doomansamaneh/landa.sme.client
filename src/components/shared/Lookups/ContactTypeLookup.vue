<template>
  <lookup-view
    dataSource="crm/contactType/getlookupData"
    sortColumn="title"
    textTemplate="{{ title }}"
    columns="title"
    :filterExpression="filterExpression"
    ref="lookup"
  />
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
