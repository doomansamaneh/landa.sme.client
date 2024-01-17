<template>
  <q-dialog
    ref="bottomSheet"
    :model-value="status"
    auto-close
    full-width
    transition-show="slide-up"
    position="bottom"
    transition-hide="slide-down"
  >

    <q-card class="no-border">

      <q-card-section class="no-padding">
        <slot name="header" />
        <slot name="body" />
      </q-card-section>

    </q-card>

  </q-dialog>
</template>


<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  status: Boolean
})

</script>
