<template>
  <slot name="toolbar">
    <tool-bar
      :inside="inside"
      :title="title"
      :id="id"
      :form-store="formStore"
      :base-route="baseRoute"
    >
      <template #toolbar-custom="{ formStore }">
        <slot name="toolbar-custom" :form-store="formStore"></slot>
      </template>
    </tool-bar>
  </slot>

  <div class="row q-col-gutter-lg" style="margin-top: -16px">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card bordered class="bordered">
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
  import { computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useInvoiceModel } from "components/areas/sls/_composables/useInvoiceModel";

  import ToolBar from "./PreviewToolbar.vue";
  import InvoiceHeader from "components/areas/sls/_shared/invoice/shared/preview/_HeaderSection.vue";
  import InvoiceHeaderSale from "components/areas/sls/_shared/invoice/shared/preview/_HeaderSale.vue";
  import InvoiceBody from "components/areas/sls/_shared/invoice/shared/preview/_BodySection.vue";
  import InvoiceFooter from "components/areas/sls/_shared/invoice/shared/preview/_FooterSection.vue";
  import DetailSection from "components/areas/sls/_shared/invoice/shared/preview/_DetailSection.vue";

  const props = defineProps({
    item: Object,
    title: String,
    baseRoute: String,
    taxApi: Boolean,
    inside: Boolean,
    detailUrl: String,
  });

  const formStore = useInvoiceModel({
    baseRoute: props.baseRoute,
    preview: true,
  });

  const route = useRoute();

  const id = computed(() => props.item?.id ?? route.params.id);

  onMounted(() => {
    formStore.getById(id.value);
  });
</script>
