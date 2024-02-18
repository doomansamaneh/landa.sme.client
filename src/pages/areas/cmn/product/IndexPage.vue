<template>
  <!-- <h6 @click="mobileView = !mobileView">mobile view toggle</h6> -->

  <!-- v-if="$q.screen.gt.sm" -->
  <!-- v-if="!mobileView" -->

  <mobile
    v-if="$q.screen.xs"
    :grid-store="gridSotre"
    :title="$t('main-menu-items.Cmn_Product_View')"
  />

  <desktop
    v-else
    :grid-store="gridSotre"
    :title="$t('main-menu-items.Cmn_Product_View')"
  />
</template>

<script setup>
import { ref } from "vue"

import Desktop from "src/components/areas/cmn/product/desktop/index/DataGrid.vue"
import Mobile from "src/components/areas/cmn/product/mobile/index/DataGrid.vue"

import { useProductGrid } from "src/components/areas/cmn/_composables/useProductGrid"

const mobileView = ref(false)

const gridSotre = useProductGrid()
</script>
