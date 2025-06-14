<template>
  <preview
    :title="
      appConfigStore.model.value?.companySetting?.invoiceTitle ??
      title ??
      $t('shared.labels.invoice')
    "
    base-route="sls/invoice"
    detail-url="trs/receipt"
    entity-name="Sls.[Invoice]"
    :comment="
      appConfigStore.model.value?.companySetting?.invoiceComment
    "
    tax-api
    show-sale-header
    show-receipt
  >
    <template #toolbar-container="{ model }">
      <toolbar-container
        :title="
          appConfigStore.model.value?.companySetting?.invoiceTitle ??
          title ??
          $t('shared.labels.invoice')
        "
        :model="model"
        :inside="inside"
        base-route="sls/invoice"
      />
    </template>
  </preview>
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import Preview from "../../../_shared/invoice/shared/preview/IndexView.vue";

  const props = defineProps({
    title: String,
    inside: Boolean,
    backButton: Boolean,
  });

  const appConfigStore = useAppConfigModel();
</script>
