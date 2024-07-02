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
  import Desktop from "components/management/business/AddBusiness.vue";

  //todo: remove this file to the business components folder
  import Background from "src/assets/BusinessBackground.vue";
</script>
