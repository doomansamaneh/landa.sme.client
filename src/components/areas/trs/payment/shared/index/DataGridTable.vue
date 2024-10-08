<template>
  <template v-if="$q.screen.xs">
    <mobile
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
    />
  </template>
  <template v-else>
    <desktop
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
    />
  </template>
</template>

<script setup>
  import Desktop from "../../desktop/index/DataGridContainer.vue";
  import Mobile from "../../mobile/index/DataGridContainer.vue";

  const props = defineProps({
    title: String,
    tableStore: Object,
    crudStore: Object,
  });
  const baseRoute = "trs/payment";
</script>
