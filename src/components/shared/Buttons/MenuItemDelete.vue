<template>
  <sheet-item
    icon="o_delete"
    :title="$t('shared.labels.delete')"
    @clik="click"
  />
</template>
<script setup>
  import SheetItem from "./MenuItem.vue";

  const emits = defineEmits("click");
  const click = () => {
    emits("click");
  };
</script>
