<template>
    <desktop
        v-if="$q.screen.gt.sm"
        :grid-store="gridSotre"
    />
    <mobile
        v-else
        :grid-store="gridSotre"
    />
</template>
  
<script setup>
import Desktop from "src/components/areas/cmn/product/desktop/index/DataGrid.vue"
import Mobile from "src/components/areas/cmn/product/mobile/index/DataGrid.vue"

import { useProductGrid } from "src/components/areas/cmn/_composables/useProductGrid"

const gridSotre = useProductGrid()
</script>
  