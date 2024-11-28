<template>
  
  <q-card-section class="q-gutter-y-md q-px-lg q-mx-sm">
    <div class="row">
      <span class="col-1 text-caption text-bold">
        {{ $t("shared.labels.period") }}:
      </span>
      <span class="text-body3 q-mx-md">
        {{ model?.month }} / {{ model?.year }} -
        {{ model?.date?.substring(0, 10) }}
      </span>
    </div>

    <div class="row">
      <span class="col-1 text-caption text-bold">
        {{ $t("shared.labels.workInsuranceNo") }}:
      </span>
      <span class="text-body3 q-mx-md">
        {{ model?.insuranceNo }}
      </span>
    </div>

    <div class="row">
      <span class="col-1 text-caption text-bold">
        {{ $t("shared.labels.total") }}:
      </span>
      <span class="text-body3 q-mx-md">
        <strong>
          {{ model?.amount?.toLocaleString() }}
        </strong>
      </span>
    </div>

    <div class="row">
      <span class="col-1 text-caption text-bold">
        {{ $t("shared.labels.taxAmount") }}:
      </span>
      <span class="text-body3 q-mx-md">
        <strong>
          {{ model?.taxAmount?.toLocaleString() }}
        </strong>
      </span>
    </div>

    <div class="row">
      <span class="col-1 text-caption text-bold">
        {{ $t("shared.labels.insuranceAmount") }}:
      </span>
      <span class="text-body3 q-mx-md">
        <strong>
          {{ model?.insurranceAmount?.toLocaleString() }}
        </strong>
      </span>
    </div>
  </q-card-section>
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const props = defineProps({
    model: Object,
    showLogo: Boolean,
  });

  const appConfigStore = useAppConfigModel();
</script>
