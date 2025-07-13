<template>
  <q-page-sticky position="bottom-right" :offset="[8, 8]">
    <q-btn
      no-caps
      round
      dense
      size="24px"
      class="primary-gradient primary-shadow"
      text-color="white"
      @click="$emit('open-dialog')"
    >
      <q-icon name="o_chat" size="32px" />
    </q-btn>
  </q-page-sticky>
</template>

<script setup>
  defineEmits(["open-dialog"]);
</script>
