<template>
  <menu-button
    v-if="$q.screen.gt.xs"
    icon="o_edit"
    :title="$t('shared.labels.edit')"
    :to="to"
  />

  <menu-button
    v-else
    round
    icon="o_edit"
    :to="to"
  />
</template>
<script setup>
  import MenuButton from "./MenuButton.vue";
</script>
