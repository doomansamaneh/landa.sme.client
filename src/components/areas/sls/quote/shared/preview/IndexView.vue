<template>
  <tool-bar
    :inside="inside"
    :margin="!inside"
    :title="title"
    buttons
    back-button
  >
    <template #buttons>
      <q-btn
        :to="`/sls/quote/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
      </q-btn>
      <q-btn
        :to="`/sls/quote/copy/${id}`"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_copy" class="q-mr-xs" />
        {{ $t("shared.labels.copy") }}
      </q-btn>
      <q-btn
        @click="formStore.crudStore.deleteById(id, deleteCallBack)"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_delete" class="q-mr-xs" />
        {{ $t("shared.labels.delete") }}
      </q-btn>
      <q-btn
        v-if="formStore.model.value.statusId !== quoteStatus.final"
        :to="`/sls/invoice/createFromQuote/${id}`"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="receipt" class="q-mr-xs" />
        تبدیل به فاکتور
      </q-btn>
      <q-btn
        @click="helper.print('invoicePreview')"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_print" class="q-mr-xs" />
        چاپ
      </q-btn>
    </template>
  </tool-bar>

  <div class="row q-col-gutter-lg" style="margin-top: -16px">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card class="bordered">
        <q-card-section class="q-gutter-y-sm" id="invoicePreview">
          <invoice-header
            :model="formStore.model"
            show-logo
            show-due-date
            :title="$t('shared.labels.quote')"
          />
          <invoice-header-sale :model="formStore.model" />
          <invoice-body
            :model="formStore.model"
            :form-store="formStore"
          />
          <invoice-footer
            show-signature
            :model="formStore.model"
            :comment="
              appConfigStore.model.value?.companySetting?.quoteComment
            "
          />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-12 col-xs-12">
      <invoice-detail
        :model="formStore.model"
        :form-store="formStore"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useRouter } from "vue-router";
  import { helper } from "src/helpers";
  import { quoteStatus } from "src/constants";
  import { useQuoteState } from "../../../_composables/useQuoteState";
  import { useInvoiceModel } from "components/areas/sls/_composables/useInvoiceModel";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import InvoiceHeader from "components/areas/sls/_shared/invoice/shared/preview/_HeaderSection.vue";
  import InvoiceHeaderSale from "components/areas/sls/_shared/invoice/shared/preview/_HeaderSale.vue";
  import InvoiceBody from "components/areas/sls/_shared/invoice/shared/preview/_BodySection.vue";
  import InvoiceFooter from "components/areas/sls/_shared/invoice/shared/preview/_FooterSection.vue";
  import InvoiceDetail from "./_DetailSection.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const formStore = useInvoiceModel({
    baseRoute: "sls/quote",
    preview: true,
  });
  const appConfigStore = useAppConfigModel();

  const route = useRoute();
  const router = useRouter();
  const quoteStore = useQuoteState();

  function deleteCallBack() {
    quoteStore.state.firstLoad.value = false;
    router.back();
  }

  const id = computed(() => props.item?.id ?? route.params.id);

  onMounted(() => {
    formStore.getById(id.value);
  });
</script>
