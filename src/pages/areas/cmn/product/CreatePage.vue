<template>
    <desktop
        action="create"
        :title="$t('shared.labels.create') + ' ' + $t('main-menu-items.Cmn_Product_View')"
    />
    <!-- <desktop v-if="$q.screen.gt.sm" />
    <mobile v-if="$q.screen.xs" /> -->
</template>
  
<script setup>
import Desktop from "src/components/areas/cmn/product/shared/forms/CreateForm.vue"
</script>
  