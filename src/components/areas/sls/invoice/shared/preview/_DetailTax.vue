<template>
  <div class="q-my-lg" v-if="!taxStore.apiResult.value.data">
    <q-btn
      color="primary"
      unelevated
      class="primary-shadow"
      @click="taxStore.sendToTax(model.value.id)"
    >
      <q-icon name="o_arrow_upward" size="xs" class="q-mr-xs" />
      <span>ارسال به سامانه مودیان</span>
    </q-btn>
  </div>
  <div class="q-mt-md">
    <div class="text-body1 no-letter-spacing text-weight-700">
      تاریخچه ارسال به سامانه مودیان
    </div>
    <data-grid
      class="q-mt-md"
      flat
      hide-filter-row
      :invoice-id="model.value.id"
    >
    </data-grid>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useTaxApiLogModel } from "src/components/areas/sls/_composables/useTaxApiLogModel";

import DataGrid from "src/components/areas/sls/invoiceTaxApiLog/shared/index/DataGrid.vue";

const props = defineProps({
  model: Object,
  formStore: Object,
});

const taxStore = useTaxApiLogModel();
onMounted(() => {
  taxStore.isSentApiSuccessfully(props.model.value.id);
});
</script>
