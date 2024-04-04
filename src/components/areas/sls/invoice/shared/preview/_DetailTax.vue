<template>
  <div class="q-my-lg">
    <q-btn color="red" unelevated class="red-shadow">
      <q-icon name="o_arrow_upward" size="xs" class="q-mr-xs" />
      <span>ارسال به سامانه مودیان</span>
    </q-btn>
  </div>
  <data-grid class="q-mt-md" flat hide-filter-row :invoice-id="model.value.id">
  </data-grid>
</template>

<script setup>
import DataGrid from "src/components/areas/sls/invoiceTaxApiLog/shared/index/DataGrid.vue";
const props = defineProps({
  model: Object,
  formStore: Object,
});
</script>
