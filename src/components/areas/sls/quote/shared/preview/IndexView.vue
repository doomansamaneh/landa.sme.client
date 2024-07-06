<template>
  <preview
    :title="title ?? $t('shared.labels.quote')"
    base-route="sls/quote"
  >
    <template #toolbar-custom="{ formStore }">
      <q-btn
        v-if="formStore.model.value.statusId !== quoteStatus.final"
        :to="`/sls/invoice/createFromQuote/${formStore.model.value.id}`"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_receipt" class="q-mr-xs" />
        تبدیل به فاکتور
      </q-btn>
    </template>

    <template #detail-section="{ formStore }">
      <detail-section
        :model="formStore.model"
        :form-store="formStore"
        :taxApi="taxApi"
      />
    </template>
  </preview>
</template>

<script setup>
  import { quoteStatus } from "src/constants";

  import Preview from "../../../_shared/invoice/shared/preview/IndexView.vue";
  import DetailSection from "./_DetailSection.vue";
</script>
