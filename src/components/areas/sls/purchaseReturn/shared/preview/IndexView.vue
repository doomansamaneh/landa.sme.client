<template>
  <preview
    :title="title ?? $t('shared.labels.purchaseReturn')"
    base-route="sls/purchaseReturn"
    entity-name="Sls.[Invoice]"
    detail-url="trs/receipt"
    show-sale-header
    tax-api_
  >
    <template #toolbar-container="{ model }">
      <toolbar-container
        :title="title ?? $t('shared.labels.purchaseReturn')"
        :model="model"
        :inside="inside"
        base-route="sls/purchaseReturn"
      />
    </template>
  </preview>
</template>

<script setup>
  import Preview from "../../../_shared/invoice/shared/preview/IndexView.vue";
  import ToolbarContainer from "./ToolbarContainer.vue";
</script>
