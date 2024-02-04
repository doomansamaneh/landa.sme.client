<template>
    <!-- <mobile :grid-store="gridSotre" /> -->

    <desktop
        v-if="$q.screen.gt.sm"
        :grid-store="gridSotre"
        :title="$t('main-menu-items.Cmn_ProductGroup_View')"
    />
    <mobile
        v-else
        :grid-store="gridSotre"
        :title="$t('main-menu-items.Cmn_Product_Group')"
    />
</template>
  
<script setup>
import Desktop from "src/components/areas/cmn/productGroup/desktop/index/DataGrid.vue"
import Mobile from "src/components/areas/cmn/productGroup/mobile/index/DataGrid.vue"

import { useProductGroupGrid } from "src/components/areas/cmn/_composables/useProductGroupGrid"

const gridSotre = useProductGroupGrid()
</script>
  