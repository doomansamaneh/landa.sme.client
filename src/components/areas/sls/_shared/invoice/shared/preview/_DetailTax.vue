<template>
  <div class="row q-gutter-sm q-py-lg">
    <q-btn
      v-if="!taxStore.apiResult.value.data"
      unelevated
      rounded
      text-color="white"
      class="primary-gradient primary-shadow"
      @click="
        taxStore.sendToTax(
          model.value.id,
          taxGrid.dataGrid.tableStore.reloadData
        )
      "
    >
      <q-icon name="o_arrow_upward" size="xs" class="q-mr-xs" />
      <span>ارسال به سامانه مودیان</span>
    </q-btn>
    <!-- v-if="!configStore.model.value.companySetting?.taxApiSetting?.clientId" -->
    <!-- <q-btn rounded to="/cmn/appConfig/VATInfo" flat unelevated>
      <q-icon name="o_settings" size="xs" class="q-mr-xs" />
      <span>پیکربندی سامانه مودیان</span>
    </q-btn> -->
  </div>
  <div class="q-mt-md">
    <div class="text-body2 no-letter-spacing text-bold">
      تاریخچه ارسال به سامانه مودیان
    </div>
    <data-grid
      ref="taxGrid"
      class="q-mt-md"
      flat
      hide-filter-row
      :invoice-id="model.value.id"
    ></data-grid>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useTaxApiLogModel } from "src/components/areas/sls/_composables/useTaxApiLogModel";

  import DataGrid from "src/components/areas/sls/invoiceTaxApiLog/shared/index/DataGrid.vue";

  const props = defineProps({
    model: Object,
  });
  const taxGrid = ref(null);
  const taxStore = useTaxApiLogModel();

  onMounted(() => {
    taxStore.isSentApiSuccessfully(props.model.value.id);
  });
</script>
