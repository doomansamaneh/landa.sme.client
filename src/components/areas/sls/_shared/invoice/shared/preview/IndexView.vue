<template>
  <slot name="toolbar">
    <tool-bar
      v-if="$q.screen.gt.sm"
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

    <tool-bar-mobile
      v-if="$q.screen.lt.md"
      :inside="inside"
      :title="title"
      :id="id"
      :form-store="formStore"
      :base-route="baseRoute"
    >
      <template #toolbar-custom="{ formStore }">
        <slot name="toolbar-custom" :form-store="formStore"></slot>
      </template>
    </tool-bar-mobile>
  </slot>

  <div
    v-if="$q.screen.gt.xs"
    class="row q-col-gutter-lg"
    style="margin-top: -16px"
  >
    <div class="col-md-8 col-sm-12 col-xs-12">
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

  <preview-mobile v-else />
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useRouter } from "vue-router";
  import { useInvoiceState } from "components/areas/sls/_composables/useInvoiceState";
  import { useInvoiceModel } from "components/areas/sls/_composables/useInvoiceModel";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  import ToolBar from "./PreviewToolbar.vue";
  import ToolBarMobile from "./PreviewToolbarMobile.vue";
  import InvoiceHeader from "components/areas/sls/_shared/invoice/shared/preview/_HeaderSection.vue";
  import InvoiceHeaderSale from "components/areas/sls/_shared/invoice/shared/preview/_HeaderSale.vue";
  import InvoiceBody from "components/areas/sls/_shared/invoice/shared/preview/_BodySection.vue";
  import InvoiceFooter from "components/areas/sls/_shared/invoice/shared/preview/_FooterSection.vue";
  import DetailSection from "components/areas/sls/_shared/invoice/shared/preview/_DetailSection.vue";
  import PreviewMobile from "components/areas/sls/_shared/invoice/shared/preview/PreviewMobile.vue";

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
