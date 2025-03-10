<template>
  <q-card-section class="q-px-none q-pt-none q-pb-lg text-center">
    <div>
      <span class="text-h6">
        {{ appConfigStore.model.value?.companySetting.name }}
      </span>
      <span class="q-px-sm">
        ({{ fiscalYearStore.currentYear.value?.title }})
      </span>
    </div>
    <div>
      <span class="text-body1">
        {{ title }}
      </span>
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
