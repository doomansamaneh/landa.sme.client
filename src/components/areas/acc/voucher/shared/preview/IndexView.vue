<template>
  <tool-bar
    :inside="inside"
    :margin="!inside"
    buttons
    :title="title"
    back-button
  >
    <template #buttons>
      <q-btn
        :to="`/acc/voucher/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
        <!-- ({{ tableStore?.activeRow?.value?.code }}) -->
      </q-btn>
      <q-btn
        :to="`/acc/voucher/copy/${id}`"
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
        @click="crudStore.deleteById(id)"
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
        @click="helper.print('invoicePreview')"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_print" class="q-mr-xs" />
        {{ $t("shared.labels.print") }}
      </q-btn>
      <q-btn
        :to="`/acc/voucher/sendEmail/${id}`"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_mail" class="q-mr-xs" />
        {{ $t("shared.labels.sendMail") }}
      </q-btn>
    </template>
  </tool-bar>

  <div class="row q-col-gutter-lg" style="margin-top: -16px">
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
  import { ref, computed, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";
  import { useVoucherState } from "../../../_composables/useVoucherState";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import BodySection from "./_BodySection.vue";
  import DetailSection from "./_DetailSection.vue";
  import HeaderSection from "src/components/areas/_shared/preview/VoucherHeader.vue";
  import FooterSection from "src/components/areas/_shared/preview/VoucherFooter.vue";

  const props = defineProps({
    item: Object,
    voucherId: String,
    voucherItemId: String,
    title: String,
    inside: Boolean,
  });

  const baseRoute = "acc/voucher";
  const model = ref(null);
  const crudStore = useFormActions(baseRoute, model);
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

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
