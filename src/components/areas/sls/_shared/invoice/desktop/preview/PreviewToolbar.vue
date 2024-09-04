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
        :to="`/${baseRoute}/edit/${id}`"
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
        :to="`/${baseRoute}/copy/${id}`"
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

      <slot name="toolbar-custom" :form-store="formStore"></slot>

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

      <q-btn
        @click="formStore.downloadPdf(id)"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="download" class="q-mr-xs" />
        تبدیل به pdf
      </q-btn>

      <q-btn
        @click="sendEmail"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="send" class="q-mr-xs" />
        ارسال ایمیل
      </q-btn>
    </template>
  </tool-bar>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import { useQuoteState } from "src/components/areas/sls/_composables/useQuoteState";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import SendEmailDialog from "../../shared/forms/SendEmailDialog.vue";

  const props = defineProps({
    id: String,
    title: String,
    inside: Boolean,
    baseRoute: String,
    formStore: Object,
  });

  const router = useRouter();
  const $q = useQuasar();
  const quoteStore = useQuoteState();

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
