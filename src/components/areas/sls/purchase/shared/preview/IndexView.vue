<template>
  <preview
    :title="title ?? $t('shared.labels.purchase')"
    base-route="sls/purchase"
    detail-url="trs/payment"
    entity-name="Sls.[Invoice]"
  >
    <template #toolbar-container="{ model }">
      <toolbar-container
        :title="title ?? $t('shared.labels.purchase')"
        :model="model"
        :inside="inside"
        base-route="sls/purchase"
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
