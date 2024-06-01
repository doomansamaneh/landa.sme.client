<template>
  <q-dialog
    ref="bottomSheet"
    :model-value="status"
    auto-close
    full-width
    position="bottom"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card :style="`min-height: ${minHeight}px`" class="no-border border-radius-lg bottom-sheet">
      <q-card-section class="no-padding">
        <slot name="header">
          <div
            v-if="header"
            class="q-pt-lg q-pb-md q-px-lg text-body2 no-letter-spacing text-center"
          >
            <slot name="header-title" />
          </div>
        </slot>
      </q-card-section>

      <q-card-section class="no-padding">
        <slot name="body" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  const props = defineProps({
    status: Boolean,
    header: Boolean,
    minHeight: String
  });
</script>
