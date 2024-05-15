<template>
  <q-card-section
    v-if="$q.screen.gt.sm"
    class="login-card-pic col-md col-sm-12 col-xs-12 q-pa-xl"
  >
    <boy-animation class="boy-animation-filter" />
  </q-card-section>
</template>

<script setup>
  import BoyAnimation from "src/assets/BoyAnimation.vue";
</script>