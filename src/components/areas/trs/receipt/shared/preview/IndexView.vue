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
        :to="`/trs/receipt/edit/${id}`"
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
        :to="`/trs/receipt/copy/${id}`"
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
        @click="crudStore.deleteById(id, deleteCallBack)"
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
    </template>
  </tool-bar>

  <div class="row q-col-gutter-lg" style="margin-top: -16px">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card bordered>
        <div id="invoicePreview">
          <header-section :model="formStore.model" />

          <q-card-section class="q-gutter-y-sm_">
            <body-section
              :model="formStore.model"
              :form-store="formStore"
            />
            <footer-section :model="formStore.model" />
          </q-card-section>
        </div>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-12 col-xs-12">
      <detail-section
        :model="formStore.model"
        :form-store="formStore"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useVoucherModel } from "components/areas/acc/_composables/useVoucherModel";
  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";
  //import { useVoucherState } from "../../../_composables/useVoucherState";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import HeaderSection from "./_HeaderSection.vue";
  import BodySection from "./_BodySection.vue";
  import FooterSection from "./_FooterSection.vue";
  import DetailSection from "./_DetailSection.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const baseRoute = "acc/voucher";
  const formStore = useVoucherModel({
    baseRoute: baseRoute,
    preview: true,
  });

  const crudStore = useFormActions(baseRoute);
  //const voucherStore = useVoucherState();

  const route = useRoute();
  const router = useRouter();

  const id = computed(() => props.item?.id ?? route.params.id);

  function deleteCallBack() {
    //voucherStore.state.firstLoad.value = false;
    router.back();
  }

  onMounted(() => {
    formStore.getById(id.value);
  });
</script>
