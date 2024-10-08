<template>
  <div class="row q-col-gutter-lg" style="margin-top: -20px">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card bordered>
        <div id="invoicePreview">
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
  import { computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useVoucherState } from "../../../_composables/useVoucherState";

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

  const voucherStore = useVoucherState();

  const route = useRoute();
  const router = useRouter();

  const id = computed(
    () => props.item?.id ?? props.voucherId ?? route.params.id
  );

  function deleteCallBack() {
    voucherStore.state.firstLoad.value = false;
    router.back();
  }
</script>
