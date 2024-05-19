<template>
  <div class="text-center">
    <h6>
      {{ appConfigStore.model.value.companySetting.name }}
    </h6>
    <div class="text-body2 text-bold">سند حسابداری</div>
  </div>
  <div class="q-gutter-sm">
    <div class="q-gutter-sm">
      <span>{{ $t("shared.labels.no") }}:</span>
      <span class="text-weight-700">
        {{ model.value.no }}
      </span>
      <span>{{ $t("shared.labels.date") }}:</span>
      <span class="text-weight-700">
        {{ model.value.date.substring(0, 10) }}
      </span>
      <template v-if="model.value.contractTitle">
        <span>{{ $t("shared.labels.contractTitle") }}:</span>
        <span class="text-weight-700">
          {{ model.value.contractTitle }}
        </span>
      </template>
    </div>
    <div class="q-gutter-sm">
      <span>{{ $t("shared.labels.comment") }}:</span>
      <span class="q-px-sm">
        {{ model.value.subject }}
      </span>
    </div>
  </div>
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";
  import { useQuasar } from "quasar";

  const $q = useQuasar();

  const props = defineProps({
    model: Object,
    showDueDate: Boolean,
    showLogo: Boolean,
  });
  const appConfigStore = useAppConfigModel();
</script>

<style lang="scss">
  .sme-logo {
    width: 72px;
  }
</style>
