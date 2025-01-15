<template>
  <q-card-section class="text-center">
    <div class="text-h6 no-letter-spacing">
      {{ appConfigStore.model.value?.companySetting.name }}
    </div>
    <div class="text-body1 no-letter-spacing">
      تراز آزمایشی - گروه حساب (1401)
    </div>
  </q-card-section>
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const appConfigStore = useAppConfigModel();
  
  const props = defineProps({
    title: String,
  });
</script>
