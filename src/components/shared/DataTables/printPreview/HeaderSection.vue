<template>
  <q-card-section class="q-pt-none q-pb-lg text-center">
    <div class="no-letter-spacing">
      <span class="text-h6">
        {{ appConfigStore.model.value?.companySetting.name }}
      </span>
      <span class="q-px-sm">
        ({{ fiscalYearStore.currentYear.value?.title }})
      </span>
    </div>
    <div class="text-body1 no-letter-spacing">
      {{ title }}
    </div>
  </q-card-section>
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";
  import { useFiscalYear } from "src/components/areas/acc/_composables/useFiscalYear";

  const appConfigStore = useAppConfigModel();
  const fiscalYearStore = useFiscalYear();

  const props = defineProps({
    title: String,
  });
</script>
