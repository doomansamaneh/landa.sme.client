<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card bordered>
        <div :ref="printStore.printRef">
          <header-section :model="model" title="سند حسابداری" />

          <q-card-section class="q-gutter-y-sm_">
            <body-section
              :model="model"
              :voucher-item-id="voucherItemId"
            />
            <footer-section :model="model" />
          </q-card-section>
        </div>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-12 col-xs-12">
      <detail-section :model="model" />
    </div>
  </div>
</template>

<script setup>
  import { usePrint } from "src/composables/usePrint.js";

  import BodySection from "../../shared/preview/_BodySection.vue";
  import DetailSection from "../../shared/preview/_DetailSection.vue";
  import HeaderSection from "src/components/areas/_shared/preview/VoucherHeader.vue";
  import FooterSection from "src/components/areas/_shared/preview/VoucherFooter.vue";

  const props = defineProps({
    item: Object,
    voucherId: String,
    voucherItemId: String,
    title: String,
    inside: Boolean,
    model: Object,
    baseRoute: String,
  });

  const printStore = usePrint();
</script>
