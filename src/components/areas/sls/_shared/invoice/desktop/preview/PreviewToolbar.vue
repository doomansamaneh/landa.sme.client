<template>
  <tool-bar
    :inside="inside"
    :margin="!inside"
    :title="title"
    buttons
    back-button
  >
    <template #buttons>
      <menu-button-edit
        class="primary-gradient primary-shadow text-white"
        :to="`/${baseRoute}/edit/${model.id}`"
      />
      <menu-button-copy :to="`/${baseRoute}/copy/${model.id}`" />
      <menu-button-delete
        @click="
          formStore.crudStore.deleteById(model.id, deleteCallBack)
        "
      />

      <slot name="toolbar-custom-desktop"></slot>

      <menu-button-print @click="helper.print('invoicePreview')" />
      <menu-button
        :title="$t('shared.labels.downloadPdf')"
        icon="download"
        @click="formStore.downloadPdf(model.id)"
      />
      <menu-button
        :title="$t('shared.labels.sendEmail')"
        icon="send"
        @click="sendEmail"
      />
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
  import MenuButton from "src/components/shared/buttons/MenuButton.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";
  import MenuButtonCopy from "src/components/shared/buttons/MenuButtonCopy.vue";
  import MenuButtonDelete from "src/components/shared/buttons/MenuButtonDelete.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";

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

  function deleteCallBack() {
    quoteStore.state.firstLoad.value = false;
    router.back();
  }

  function sendEmail() {
    $q.dialog({
      component: SendEmailDialog,
      componentProps: {
        id: props.model.id,
        baseRoute: props.baseRoute,
      },
    }).onOk(async () => {
      await reloadData();
    });
  }
</script>
