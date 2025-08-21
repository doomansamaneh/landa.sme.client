<template>
  <q-card-section>
    <div class="text-center">
      <div class="text-h6">
        {{ appConfigStore.model?.value?.companySetting.name }}
      </div>
      <div class="text-body2 text-bold">{{ $t("shared.labels.payrollSlip") }}</div>
    </div>
  </q-card-section>

  <q-separator />

  <q-card-section>
    <div class="row">
      <div class="col-md-3 col-sm-3 col-xs-6">
        <span class="text-caption text-bold">
          {{ $t("shared.labels.code") }}:
        </span>
        <span class="text-body3 q-mx-md">
          {{ model?.customerCode }}
        </span>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-6">
        <span class="text-caption text-bold">
          {{ $t("shared.labels.insuranceNo") }}:
        </span>
        <span class="text-body3 q-mx-md">
          {{ model?.insurranceNo }}
        </span>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-6">
        <span class="text-caption text-bold">
          {{ $t("shared.labels.name") }}:
        </span>
        <span class="text-body3 q-mx-md">
          {{ model?.customerName }}
        </span>
      </div>
      <div class="col-md-3 col-sm-3 col-xs-6">
        <span class="text-caption text-bold">
          {{ $t("shared.labels.period") }}:
        </span>
        <span class="text-body3 q-mx-md">
          {{ model?.month }} / {{ model?.year }}
        </span>
      </div>
    </div>
  </q-card-section>
  <q-separator />
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const props = defineProps({
    model: Object,
    showLogo: Boolean,
  });

  const appConfigStore = useAppConfigModel();
</script>
