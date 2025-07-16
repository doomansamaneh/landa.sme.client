<template>
  <q-btn
    no-caps
    unelevated
    rounded
    dense
    padding="4px 12px"
    size="14px"
    @click="$emit('open-dialog')"
    class="bordered text-on-dark gt-xs"
  >
    <q-icon name="support_agent" class="q-mr-sm" />
    <div class="text-body2">پشتیبانی</div>
  </q-btn>
</template>

<script setup>
  defineEmits(["open-dialog"]);
</script>
