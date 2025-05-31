<template>
  <q-separator
    :style="
      $q.dark.isActive ? 'background-color: #ffffff47' : '00000047'
    "
    vertical
    size="0.5px"
  />

  <q-card-section
    v-if="$q.screen.gt.sm"
    class="login-card-pic col-md col-sm-12 col-xs-12 q-pa-lg"
  >
    <boy-animation class="boy-animation-filter" />
    <div class="q-mt-xl text-center">
      <img width="250px" src="/about-us-header.png" alt="" />
    </div>
  </q-card-section>
</template>

<script setup>
  import BoyAnimation from "src/assets/BoyAnimation.vue";
</script>
