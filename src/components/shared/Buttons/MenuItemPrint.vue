<template>
  <sheet-item
    icon="o_print"
    :title="$t('shared.labels.print')"
    :to="to"
    @clik="click"
  />
</template>
<script setup>
  import SheetItem from "./MenuItem.vue";
  const props = defineProps({
    to: String,
  });

  const emits = defineEmits("click");
  const click = () => {
    emits("click");
  };
</script>
