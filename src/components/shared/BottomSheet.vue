<template>
  <q-dialog
    ref="bottomSheet"
    :model-value="status"
    auto-close
    full-width
    position="bottom"
    transition-show="slide-up"
    transition-duration="600"
    transition-hide="slide-down"
  >
    <q-card
      :style="`min-height: ${dynamicMinHeight}px; max-height: 750px;`"
      class="no-border border-radius-lg bottom-sheet"
    >
      <div v-touch-swipe.mouse.down="closeBottomSheet">
        <div class="flex items-center justify-center">
          <q-separator
            size="4px"
            style="width: 40px; border-radius: 25px"
            spaced
          />
        </div>
        <q-card-section
          v-if="header"
          class="header-sticky q-px-md q-py-sm text-body2 text-center"
        >
          <slot name="header">
            <slot name="header-title" />
          </slot>
        </q-card-section>
      </div>

      <q-card-section class="no-padding scroll hide-scrollbar">
        <slot name="body" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";

  const props = defineProps({
    status: Boolean,
    header: Boolean,
    minHeight: Number,
  });

  const bottomSheet = ref(null);

  function closeBottomSheet() {
    bottomSheet.value.hide();
  }
</script>

<style scoped>
  .scroll {
    max-height: calc(100vh - 260px);
    overflow-y: auto;
  }

  .header-sticky {
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>
