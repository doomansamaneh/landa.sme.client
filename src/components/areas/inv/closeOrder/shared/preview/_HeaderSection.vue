<template>
  <q-card-section>
    <div class="q-gutter-sm text-center">
      <h6>
        {{ appConfigStore.model.value.companySetting.name }}
      </h6>
      <div class="text-body2 text-bold">
        {{ $t("main-menu-items.Inv_CloseOrder_View") }}
      </div>
    </div>
  </q-card-section>
  <q-separator />
  <q-card-section class="q-gutter-md">
    <div class="q-gutter-sm">
      <div class="q-gutter-sm">
        <span>{{ $t("shared.labels.rowNo") }}:</span>
        <span class="text-weight-700">
          {{ model.rowNo }}
        </span>
        <span>{{ $t("shared.labels.date") }}:</span>
        <span class="text-weight-700">
          {{ model.date.substring(0, 10) }}
        </span>
        <template v-if="model.contractTitle">
          <span>{{ $t("shared.labels.contractTitle") }}:</span>
          <span class="text-weight-700">
            {{ model.contractTitle }}
          </span>
        </template>
      </div>
      <div class="q-gutter-sm">
        <span>{{ $t("shared.labels.comment") }}:</span>
        <span class="q-px-sm">
          {{ model.subject }}
        </span>
      </div>
    </div>
  </q-card-section>
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const props = defineProps({
    model: Object,
  });
  const appConfigStore = useAppConfigModel();
</script>
