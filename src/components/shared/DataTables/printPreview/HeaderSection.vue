<template>
  <q-card-section class="q-pt-none q-pb-lg text-center">
    <div class="text-h6 no-letter-spacing">
      {{ appConfigStore.model.value?.companySetting.name }}
    </div>
    <div class="text-body1 no-letter-spacing">
      {{ title }} ({{ fiscalYearStore.currentYear.value?.title }})
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
