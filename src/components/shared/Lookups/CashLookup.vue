<template>
  <lookup-view
    dataSource="trs/cash/getlookupData"
    sortColumn="title"
    textTemplate="{{ title }}"
    columns="title,amount"
    :filterExpression="filterExpression"
    show-add
    :create-form="CreateForm"
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
  import CreateForm from "src/components/areas/trs/cash/shared/forms/CreateForm.vue";

  const props = defineProps({
    filterExpression: Array,
  });

  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
