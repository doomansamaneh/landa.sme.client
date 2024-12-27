<template>
  <q-card bordered>
    <div :ref="printStore.printRef">
      <q-card-section>
        <invoice-header show-logo :model="model" :title="title" />
      </q-card-section>
      <q-card-section class="q-gutter-y-sm">
        <header-sale v-if="showSaleHeader" :model="model" />
        <header-purchase v-else :model="model" />
        <invoice-body :model="model" />
        <invoice-footer show-signature :model="model" :comment="comment" />
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
import { usePrint } from "src/composables/usePrint";

import InvoiceHeader from "./_HeaderSection.vue";
import HeaderSale from "./_HeaderSale.vue";
import HeaderPurchase from "./_HeaderPurchase.vue";
import InvoiceBody from "./_BodySection.vue";
import InvoiceFooter from "./_FooterSection.vue";

const props = defineProps({
  model: Object,
  title: String,
  showSaleHeader: Boolean,
  comment: String,
});

const printStore = usePrint();
</script>
