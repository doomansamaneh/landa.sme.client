<template>
  <div class="row q-col-gutter-lg" style="margin-top: -16px">
    <div v-if="$q.screen.gt.xs" class="col-md-8 col-sm-12 col-xs-12">
      <q-card bordered>
        <q-card-section class="q-gutter-y-sm" id="invoicePreview">
          <invoice-header
            show-logo
            :model="formStore.model"
            :title="title"
          />
          <invoice-header-sale :model="formStore.model" />
          <invoice-body
            :model="formStore.model"
            :form-store="formStore"
          />
          <invoice-footer show-signature :model="formStore.model" />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md-4 col-sm-12 col-xs-12">
      <slot name="detail-section" :form-store="formStore">
        <detail-section
          :model="formStore.model"
          :form-store="formStore"
          :tax-api="taxApi"
          :detail-url="detailUrl"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useRouter } from "vue-router";
  import { useInvoiceState } from "components/areas/sls/_composables/useInvoiceState";
  import { useInvoiceModel } from "components/areas/sls/_composables/useInvoiceModel";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  import InvoiceHeader from "./_HeaderSection.vue";
  import InvoiceHeaderSale from "./_HeaderSale.vue";
  import InvoiceBody from "./_BodySection.vue";
  import InvoiceFooter from "./_FooterSection.vue";
  import DetailSection from "./_DetailSection.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
  });

  const formStore = useInvoiceModel({
    baseRoute: "sls/invoice",
    preview: true,
  });

  const route = useRoute();
  const router = useRouter();
  const invoiceStore = useInvoiceState();

  function deleteCallBack() {
    invoiceStore.state.firstLoad.value = false;
    router.back();
  }

  const id = computed(() => props.item?.id ?? route.params.id);
  const appConfigStore = useAppConfigModel();

  onMounted(() => {
    formStore.getById(id.value);
  });
</script>
