<template>
  <div class="row items-center q-gutter-md no-letter-spacing q-pa-sm">
    <q-btn
      v-if="node.isActive"
      size="8px"
      round
      unelevated
      class="no-pointer-events"
      color="green"
    >
      <q-icon color="white" name="o_check" size="16px" />
    </q-btn>
    <q-btn
      v-else
      size="8px"
      round
      unelevated
      class="no-pointer-events"
      color="red"
    >
      <q-icon color="white" name="close" size="16px" />
    </q-btn>
    <div class="text-body2 no-letter-spacing">
      {{ node.code }} - {{ node.title }}
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    node: Object,
  });
</script>
