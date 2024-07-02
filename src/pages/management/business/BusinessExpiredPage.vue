<template>
  <q-page
    :class="
      $q.screen.gt.xs
        ? 'row items-center justify-center overflow-hidden'
        : ''
    "
  >
    <div class="main-container">
      <background v-if="$q.screen.gt.xs" />
      <desktop />
    </div>
  </q-page>
</template>

<script setup>
  import Desktop from "src/components/management/business/BusinessExpired.vue";
</script>
