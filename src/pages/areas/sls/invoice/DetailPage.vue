<template>
    <desktop
        v-if="$q.screen.gt.sm"
        :title="$t('shared.labels.detail') + ' ' + $t('main-menu-items.Sls_Invoice_View')"
    />
    <mobile
        v-else
        :title="$t('shared.labels.detail') + ' ' + $t('main-menu-items.Sls_Invoice_View')"
    />
</template>
  
<script setup>
import Desktop from "src/components/areas/sls/invioce/shared/detail/InvoicePreview.vue"
import Mobile from "src/components/areas/sls/invioce/shared/detail/InvoicePreview.vue"
</script>
  