<template>
  <tool-bar inside buttons :title="title" back-button>
    <template #buttons>
      <q-btn
        :to="`/sls/invoice/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        edit...
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
        <!-- ({{ tableStore?.activeRow?.value?.code }}) -->
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
          <invoice-header :model="formStore.model" />
          <invoice-body
            :model="formStore.model"
            :form-store="formStore"
          />
          <invoice-footer :model="formStore.model" />
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
  import { useInvoiceModel } from "components/areas/sls/_composables/useInvoiceModel";
  import { helper } from "src/helpers";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import InvoiceHeader from "./_HeaderSection.vue";
  import InvoiceBody from "./_BodySection.vue";
  import InvoiceFooter from "./_FooterSection.vue";
  import InvoiceDetail from "./_DetailSection.vue";

  const props = defineProps({
    item: Object,
    title: String,
  });

  const formStore = useInvoiceModel({
    baseRoute: "sls/invoice",
    preview: true,
  });
  const route = useRoute();
  const router = useRouter();

  const id = computed(() => props.item?.id ?? route.params.id);

  onMounted(() => {
    formStore.getById(id.value);
  });
</script>
