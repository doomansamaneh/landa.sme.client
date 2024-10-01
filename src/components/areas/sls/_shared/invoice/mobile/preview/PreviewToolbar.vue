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
        :to="`/${baseRoute}/edit/${model.id}`"
        class="text-caption"
        round
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
      </q-btn>

      <q-btn
        @click="onBottomSheetShow"
        class="text-caption"
        round
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_more_vert" />
      </q-btn>
    </template>
  </tool-bar>

  <bottom-sheet
    v-if="bottomSheetStatus"
    header
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >
    <template #header-title>
      {{ $t("shared.labels.more") }}
    </template>

    <template #body>
      <q-list padding>
        <menu-item-copy :to="`/${baseRoute}/copy/${model.id}`" />

        <slot
          name="toolbar-custom-mobile"
          :form-store="formStore"
          :model="model"
        ></slot>

        <q-separator size="0.5px" class="q-my-sm" />

        <menu-item-print @click="helper.print('invoicePreview')" />
        <menu-item-print
          icon="o_download"
          :title="$t('shared.labels.downloadPdf')"
          @click="formStore.downloadPdf(model.id)"
        />

        <menu-item
          icon="o_send"
          :title="$t('shared.labels.sendEmail')"
          @click="sendEmail"
        />

        <q-separator size="0.5px" class="q-my-sm" />

        <menu-item-delete
          @click="
            formStore.crudStore.deleteById(model.id, deleteCallBack)
          "
        />
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import { useQuoteState } from "src/components/areas/sls/_composables/useQuoteState";

  import ToolBar from "src/components/shared/ToolBarMobile.vue";
  import SendEmailDialog from "src/components/areas/sls/_shared/invoice/shared/forms/SendEmailDialog.vue";
  import BottomSheet from "src/components/shared/BottomSheet.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";
  import MenuItemDelete from "src/components/shared/buttons/MenuItemDelete.vue";
  import MenuItemCopy from "src/components/shared/buttons/MenuItemCopy.vue";
  import MenuItemPrint from "src/components/shared/buttons/MenuItemPrint.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    baseRoute: String,
    formStore: Object,
  });

  const router = useRouter();
  const $q = useQuasar();
  const quoteStore = useQuoteState();

  const bottomSheetStatus = ref(false);

  const onBottomSheetShow = () => {
    bottomSheetStatus.value = true;
  };

  const onBottomSheetHide = () => {
    bottomSheetStatus.value = false;
  };

  function deleteCallBack() {
    quoteStore.state.firstLoad.value = false;
    router.back();
  }

  function sendEmail() {
    $q.dialog({
      component: SendEmailDialog,
      componentProps: {
        id: props.id,
        baseRoute: props.baseRoute,
      },
    }).onOk(async () => {
      await reloadData();
    });
  }
</script>
