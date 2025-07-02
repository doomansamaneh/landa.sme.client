<template>
  <q-btn
    no-caps
    size="11px"
    round
    flat
    :disable="disable"
    class="delete-btn"
  >
    <q-icon size="22px" name="o_delete" />
  </q-btn>
</template>

<script setup>
  const props = defineProps({
    disable: Boolean,
  });
</script>

<style lang="scss">
  .delete-btn {
    transition: all 0.2s ease;

    &:hover {
      color: #f44336;
      background: rgba(244, 67, 54, 0.1);
    }
  }
</style>
