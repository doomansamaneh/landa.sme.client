<template>
    <!-- <mobile :grid-store="gridSotre" /> -->

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
import Desktop from "src/components/areas/cmn/productGroup/desktop/index/DataGrid.vue"
import Mobile from "src/components/areas/cmn/productGroup/mobile/index/DataGrid.vue"

import { useProductGroupGrid } from "src/components/areas/cmn/_composables/useProductGroupGrid"

const gridSotre = useProductGroupGrid()
</script>
  