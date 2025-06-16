<template>
  <toolbar-observer ref="observer">
    <go-back-link />

    <div
      class="title-width ellipsis-2-lines text-weight-700"
      :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'"
    >
      <span class="text-body2">
        {{ title }}
      </span>
      <q-btn
        v-if="tableStore?.pagination.value.totalItems > 0"
        rounded
        unelevated
        dense
        padding="0px 6px"
        outline
        :label="tableStore?.pagination.value.totalItems"
        class="q-ml-sm bg-dark text-on-dark text-body3 no-pointer-events"
      />
    </div>

    <q-space />

    <q-btn
      dense
      round
      class="text-caption q-mr-sm"
      unelevated
      @click="bottomSheet?.show()"
    >
      <q-icon name="more_vert" />
    </q-btn>
  </toolbar-observer>

  <mobile-bottom-sheet ref="bottomSheet" :menu-items="menuItems" />
</template>

<script setup>
  import { ref } from "vue";

  import GoBackLink from "../buttons/GoBackLink.vue";
  import ToolbarObserver from "./ToolbarObserver.vue";
  import MobileBottomSheet from "./MobileBottomSheet.vue";

  const props = defineProps({
    title: String,
    menuItems: Array,
  });

  const bottomSheet = ref(null);
</script>

<style lang="scss">
  @media (min-width: 320px) and (max-width: 360px) {
    .title-width {
      max-width: 160px !important;
    }
  }

  @media (min-width: 376px) and (max-width: 599px) {
    .title-width {
      max-width: auto !important;
    }
  }
</style>
