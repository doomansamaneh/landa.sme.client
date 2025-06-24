<template>
  <toolbar-desktop
    v-if="$q.screen.gt.xs"
    :inside="inside"
    :margin="!inside"
    :title="title"
    buttons
    back-button
  >
    <template #buttons>
      <q-btn
        :to="`/sls/invoice/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
      </q-btn>
      <q-btn
        :to="`/sls/invoice/copy/${id}`"
        class="text-body2"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_copy" class="q-mr-xs" />
        {{ $t("shared.labels.copy") }}
      </q-btn>
      <q-btn
        @click="formStore.crudStore.deleteById(id)"
        class="text-body2"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_delete" class="q-mr-xs" />
        {{ $t("shared.labels.delete") }}
      </q-btn>
      <q-btn
        @click="printStore.handlePrint()"
        class="text-body2"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_print" class="q-mr-xs" />
        چاپ
      </q-btn>
      <q-btn
        @click="printStore.downloadPdf()"
        class="text-body2"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="download" class="q-mr-xs" />
        تبدیل به pdf
      </q-btn>
    </template>
  </toolbar-desktop>

  <toolbar-mobile
    v-if="$q.screen.xs"
    :title="title"
    buttons
    back-button
  >
    <template #buttons>
      <div class="row items-center q-gutter-sm">
        <q-btn
          :to="`/sls/invoice/edit/${id}`"
          round
          class="text-caption"
          unelevated
        >
          <q-icon name="o_edit" />
        </q-btn>
        <q-btn
          @click="onBottomSheetShow"
          round
          class="text-caption"
          unelevated
        >
          <q-icon name="o_more_horiz" />
        </q-btn>
      </div>
    </template>
  </toolbar-mobile>

  <div class="row q-col-gutter-lg" style="margin-top: -24px">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card
        class="bordered"
        :class="$q.screen.xs ? 'form-container' : ''"
        style="margin-top: 0"
      >
        <q-card-section class="q-gutter-y-sm" id="invoicePreview">
          <invoice-header
            :model="formStore.model"
            show-logo
            :title="invoiceTitle ?? $t('shared.labels.invoice')"
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
              appConfigStore.model.value?.companySetting
                ?.invoiceComment
            "
          />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-12 col-xs-12">
      <detail-section
        :model="formStore.model"
        :form-store="formStore"
        taxApi
      />
    </div>
  </div>

  <bottom-sheet
    v-if="bottomSheetStatus"
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >
    <template #body>
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark" icon="o_copy" />
          </q-item-section>

          <q-item-section class="text-body1">کپی</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="showPrintDialog">
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_print"
            />
          </q-item-section>

          <q-item-section class="text-body1">چاپ</q-item-section>
        </q-item>

        <q-separator class="q-my-sm" />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_delete"
            />
          </q-item-section>

          <q-item-section class="text-body1">حذف</q-item-section>
        </q-item>
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useRouter } from "vue-router";
  import { usePrint } from "src/composables/usePrint";
  import { useInvoiceState } from "../../../_composables/useInvoiceState";
  import { useInvoiceModel } from "components/areas/sls/_composables/useInvoiceModel";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolBarDesktop.vue";
  import ToolbarMobile from "src/components/shared/ToolBarMobile.vue";
  import BottomSheet from "src/components/shared/BottomSheet.vue";
  import InvoiceHeader from "components/areas/sls/_shared/invoice/shared/preview/_HeaderSection.vue";
  import InvoiceHeaderSale from "components/areas/sls/_shared/invoice/shared/preview/_HeaderSale.vue";
  import InvoiceBody from "components/areas/sls/_shared/invoice/shared/preview/_BodySection.vue";
  import InvoiceFooter from "components/areas/sls/_shared/invoice/shared/preview/_FooterSection.vue";
  import DetailSection from "components/areas/sls/_shared/invoice/shared/preview/_DetailSection.vue";

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
  const printStore = usePrint();
  const bottomSheetStatus = ref(false);

  const onBottomSheetShow = () => {
    bottomSheetStatus.value = true;
  };

  const onBottomSheetHide = () => {
    bottomSheetStatus.value = false;
  };

  function deleteCallBack() {
    invoiceStore.state.firstLoad.value = false;
    router.back();
  }

  const id = computed(() => props.item?.id ?? route.params.id);
  const appConfigStore = useAppConfigModel();
  const invoiceTitle =
    appConfigStore.model.value?.companySetting?.invoiceTitle;

  onMounted(() => {
    formStore.getById(id.value);
  });
</script>
