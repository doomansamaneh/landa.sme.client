<template>
  <menu-button
    icon="o_print"
    :title="$t('shared.labels.print')"
    :to="to"
    @clik="click"
  />
</template>
<script setup>
  import MenuButton from "./MenuButton.vue";

  const props = defineProps({
    to: String,
  });

  const emits = defineEmits("click");
  const click = () => {
    emits("click");
  };
</script>
