<template>
  <preview
    :title="title ?? $t('shared.labels.salesReturn')"
    base-route="sls/salesReturn"
    entity-name="Sls.[Invoice]"
    detail-url="trs/payment"
    show-sale-header
    tax-api
  >
    <template #toolbar-container="{ model }">
      <toolbar-container
        :title="title ?? $t('shared.labels.salesReturn')"
        :model="model"
        :inside="inside"
        base-route="sls/salesReturn"
      />
    </template>
  </preview>
</template>

<script setup>
  import ToolbarContainer from "./ToolbarContainer.vue";
  import Preview from "../../../_shared/invoice/shared/preview/IndexView.vue";

  const props = defineProps({
    title: String,
    inside: Boolean,
  });
</script>
