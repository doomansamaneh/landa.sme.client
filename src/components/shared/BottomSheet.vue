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
    <q-card
      :style="`min-height: ${minHeight}px`"
      class="no-border border-radius-lg bottom-sheet"
    >
      <q-card-section class="no-padding">
        <slot name="header">
          <div
            v-if="header"
            class="q-pt-lg q-pb-sm q-px-lg text-body2 text-center"
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
  import { onBeforeRouteLeave } from "vue-router";
  import { ref } from "vue";

  const props = defineProps({
    status: Boolean,
    header: Boolean,
    minHeight: String,
  });

  const bottomSheet = ref(null);

  // Todo: How to prevent backButton from router
  // onBeforeRouteLeave((to, from, next) => {
  //   if (props.status) {
  //     bottomSheet.value.hide();
  //     next(false);

  //     setTimeout(() => {
  //       next();
  //     }, 300);
  //   } else {
  //     next();
  //   }
  // });
</script>
