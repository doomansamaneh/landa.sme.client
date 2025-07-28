<template>
  <!-- <mobile :grid-store="gridStore" /> -->
  <q-page
    :class="
      $q.screen.gt.xs
        ? 'row items-center justify-center overflow-hidden'
        : ''
    "
  >
    <div class="main-container">
      <template v-if="$q.screen.gt.xs">
        <background />
        <desktop :grid-store="gridStore" />
      </template>

      <template v-if="$q.screen.xs">
        <mobile :grid-store="gridStore" />
      </template>
    </div>
  </q-page>
</template>

<script setup>
  import Desktop from "components/management/business/desktop/index/DataGrid.vue";
  import Mobile from "components/management/business/mobile/index/DataGrid.vue";

  import { useBusinessGrid } from "src/components/management/_composables/useBusinessGrid";
  //todo: remove this file to the business components folder
  import Background from "src/assets/BusinessBackground.vue";

  const gridStore = useBusinessGrid();

  gridStore.reset();
</script>
