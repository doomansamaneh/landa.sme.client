<template>
  <q-dialog ref="bottomSheet" :model-value="status" auto-close full-width position="bottom" transition-show="slide-up"
    transition-hide="slide-down">
    <q-card class="no-border border-radius-lg bottom-sheet">

      <q-card-section class="no-padding">
        <slot name="header">
          <div class="q-pa-lg text-body2 no-letter-spacing text-center">
            <slot name="header-title" />
          </div>
        </slot>
        <slot name="body" />
      </q-card-section>

    </q-card>

  </q-dialog>
</template>

<script setup>
const props = defineProps({
  status: Boolean
})
</script>
