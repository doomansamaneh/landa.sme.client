<template>
  <!-- todo: show after completion this part -->
  <q-page-sticky
    v-if="false"
    position="bottom-right"
    :offset="[8, 8]"
  >
    <q-btn
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
