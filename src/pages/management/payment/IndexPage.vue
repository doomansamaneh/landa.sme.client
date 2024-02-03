<template>
    <!-- <mobile :grid-store="gridStore" /> -->
    <q-page :class="$q.screen.gt.xs ? 'row items-center justify-center overflow-hidden' : ''">
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
import Desktop from "components/management/payment/desktop/index/DataGrid.vue"
import Mobile from "components/management/payment/mobile/index/DataGrid.vue"

import { usePaymentGrid } from "src/components/management/_composables/usePaymentGrid"
//todo: remove this file to the business components folder
import Background from "src/assets/BusinessBackground.vue"

const gridStore = usePaymentGrid()
</script>
