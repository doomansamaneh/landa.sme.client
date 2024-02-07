<template>
  <q-page style="min-height: unset;">
    <template v-if="$q.screen.gt.xs">
      <desktop />
    </template>

    <template v-if="$q.screen.xs">
      <mobile />
    </template>
  </q-page>
</template>

<script setup>
import Desktop from "components/management/settings/desktop/index/IndexView.vue"
import Mobile from "components/management/settings/mobile/index/IndexView.vue"
</script>
