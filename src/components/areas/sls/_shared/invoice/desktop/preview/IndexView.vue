<template>
  <div class="row q-col-gutter-lg" style="margin-top: -16px">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card bordered>
        <q-card-section>
          <invoice-header show-logo :model="model" :title="title" />
        </q-card-section>
        <q-card-section class="q-gutter-y-sm" id="invoicePreview">
          <invoice-header-sale :model="model" />
          <invoice-body :model="model" />
          <invoice-footer show-signature :model="model" />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md-4 col-sm-12 col-xs-12">
      <detail-section
        :model="model"
        tax-api
        :detail-url="detailUrl"
      />
    </div>
  </div>
</template>

<script setup>
  import InvoiceHeader from "./_HeaderSection.vue";
  import InvoiceHeaderSale from "./_HeaderSale.vue";
  import InvoiceBody from "./_BodySection.vue";
  import InvoiceFooter from "./_FooterSection.vue";
  import DetailSection from "../../shared/preview/_DetailSection.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
  });

  // const invoiceStore = useInvoiceState();

  // function deleteCallBack() {
  //   invoiceStore.state.firstLoad.value = false;
  //   router.back();
  // }
</script>
