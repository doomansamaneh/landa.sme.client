<template>
  <mobile v-if="$q.screen.xs" />
  <desktop v-if="$q.screen.gt.xs" />
</template>

<script setup>
import { computed, ref } from "vue"
import mobile from "src/components/areas/sls/invoice/create/mobile/IndexView.vue"
import desktop from "src/components/areas/sls/invoice/create/desktop/IndexView.vue"
</script>


