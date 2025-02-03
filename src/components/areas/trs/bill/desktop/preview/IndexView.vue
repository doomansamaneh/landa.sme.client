<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card bordered>
        <div :ref="printStore.printRef">
          <header-section :model="model" :title="title" />

          <q-card-section class="q-gutter-y-sm_">
            <body-section
              :model="model"
              :voucher-item-id="voucherItemId"
              :type="type"
            />
            <footer-section :model="model">
              <template #cell1>مهر و امضا دریافت کننده</template>
              <template #cell2>مهر و امضا پرداخت کننده</template>
            </footer-section>
          </q-card-section>
        </div>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-12 col-xs-12">
      <detail-section :model="model" :type="type" />
    </div>
  </div>
</template>

<script setup>
  import { documentType } from "src/constants";
  import { usePrint } from "src/composables/usePrint";

  import BodySection from "./BodySection.vue";
  import DetailSection from "../../shared/preview/_DetailSection.vue";
  import HeaderSection from "src/components/areas/_shared/preview/VoucherHeader.vue";
  import FooterSection from "src/components/areas/_shared/preview/VoucherFooter.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
    model: Object,
    baseRoute: String,
    type: documentType,
  });

  const printStore = usePrint();
</script>
