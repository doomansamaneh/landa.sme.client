<template>
  <div class="col-2 row justify-end text-caption text-weight-300">
    <q-btn
      class="absolute-top-right q-ma-sm"
      round
      dense
      unelevated
      size="11px"
      @click="bottomSheet?.show()"
      @click.prevent="click"
    >
      <q-icon name="more_vert" size="20px" />
    </q-btn>
  </div>

  <mobile-bottom-sheet
    ref="bottomSheet"
    :title="title"
    :menu-items="menuItems"
  />
</template>

<script setup>
  import { ref } from "vue";

  import MobileBottomSheet from "./MobileBottomSheet.vue";

  const props = defineProps({
    title: String,
    menuItems: Array,
  });

  const bottomSheet = ref(null);
</script>
