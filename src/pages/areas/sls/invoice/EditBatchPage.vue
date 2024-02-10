<template>
    <desktop
        action="editBatch"
        :title="$t('shared.labels.editBatch') + ' ' + $t('main-menu-items.Cmn_Product_View')"
    />
</template>
  
<script setup>
import Desktop from "src/components/areas/cmn/product/shared/forms/EditBatchForm.vue"
</script>