<template>
  <lookup-view
    ref="lookup"
    dataSource="acc/accountDL/getlookupData"
    sortColumn="code"
    textTemplate="{{ code }} - {{ title }}"
    columns="code,title"
    :filterExpression="filterExpression"
  />
</template>

<script setup>
  import { ref } from "vue";
  import LookupView from "src/components/shared/dataTables/LookupView.vue";

  const props = defineProps({
    filterExpression: Array,
  });

  const lookup = ref(null);
  const test = () => {
    alert("dl lookup");
  };

  defineExpose({
    lookup,
    test,
  });
</script>
