<template>
  <preview
    :title="title ?? $t('shared.labels.quote')"
    base-route="sls/quote"
    entity-name="Sls.[Quote]"
    show-sale-header
    :comment="
      appConfigStore.model.value?.companySetting?.quoteComment
    "
  >
    <template #toolbar-container="{ model }">
      <toolbar-container
        :title="title ?? $t('shared.labels.quote')"
        :model="model"
        :inside="inside"
        base-route="sls/quote"
      />
    </template>

    <template #detail-section="{ model }">
      <detail-section :model="model" />
    </template>
  </preview>
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  import Preview from "../../../_shared/invoice/shared/preview/IndexView.vue";
  import DetailSection from "./_DetailSection.vue";
  import ToolbarContainer from "./ToolbarContainer.vue";

  const props = defineProps({
    title: String,
    inside: Boolean,
  });

  const appConfigStore = useAppConfigModel();
</script>
