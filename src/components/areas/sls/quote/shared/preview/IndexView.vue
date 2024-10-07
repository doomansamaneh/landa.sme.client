<template>
  <preview
    :title="title ?? $t('shared.labels.quote')"
    base-route="sls/quote"
    entity-name="Sls.[Quote]"
    show-sale-header
  >
    <template #toolbar-custom-desktop="{ model }">
      <menu-button
        v-if="model.statusId !== quoteStatus.final"
        :to="`/sls/invoice/createFromQuote/${model.id}`"
        icon="o_receipt"
        :title="$t('shared.labels.convertToInvoice')"
      />
    </template>
    <template #toolbar-custom-mobile="{ model }">
      <menu-item
        v-if="model.statusId !== quoteStatus.final"
        :to="`/sls/invoice/createFromQuote/${model.id}`"
        icon="o_receipt"
        :title="$t('shared.labels.convertToInvoice')"
      />
    </template>

    <template #detail-section="{ model }">
      <detail-section :model="model" />
    </template>
  </preview>
</template>

<script setup>
  import { quoteStatus } from "src/constants";

  import Preview from "../../../_shared/invoice/shared/preview/IndexView.vue";
  import DetailSection from "./_DetailSection.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";
  import MenuButton from "src/components/shared/buttons/MenuButton.vue";
</script>
