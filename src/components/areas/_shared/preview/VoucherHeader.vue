<template>
  <q-card-section>
    <div class="text-center">
      <div class="text-h6 no-letter-spacing">
        {{ appConfigStore.model.value.companySetting.name }}
      </div>
      <div class="text-body2 text-bold no-letter-spacing">
        {{ title }}
      </div>
    </div>
  </q-card-section>

  <q-separator />

  <q-card-section>
    <div style="display: flex; gap: 8px">
      <div
        v-if="
          appConfigStore.model.value.companySetting.showDocNoInVoucher
        "
      >
        <span style="padding-left: 2px">
          {{ $t("shared.labels.rowNo") }}:
        </span>
        <span class="text-weight-700">
          {{ model?.rowNo }}
        </span>
      </div>

      <div v-if="model?.no">
        <span style="padding-left: 2px">
          {{ $t("shared.labels.no") }}:
        </span>
        <span class="text-weight-700">
          {{ model?.no }}
        </span>
      </div>

      <div>
        <span style="padding-left: 2px">
          {{ $t("shared.labels.date") }}:
        </span>
        <span class="text-weight-700">
          {{ model?.date.substring(0, 10) }}
        </span>
      </div>
      <div v-if="model?.contractTitle">
        <span style="padding-left: 2px">
          {{ $t("shared.labels.contractTitle") }}:
        </span>
        <span class="text-weight-700">
          {{ model?.contractTitle }}
        </span>
      </div>
    </div>

    <div class="q-mt-xs">
      <span style="padding-left: 2px">
        {{ $t("shared.labels.comment") }}:
      </span>
      {{ model?.subject }}
    </div>
    <slot name="header"></slot>
  </q-card-section>
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const props = defineProps({
    model: Object,
    title: String,
  });

  const appConfigStore = useAppConfigModel();
</script>

<style lang="scss">
  .sme-logo {
    width: 72px;
  }
</style>
