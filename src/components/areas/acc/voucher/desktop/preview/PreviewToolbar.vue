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
        :to="`/${baseRoute}/edit/${model?.id}`"
      />
      <menu-button-copy :to="`/${baseRoute}/copy/${model?.id}`" />

      <menu-button-delete
        @click="crudStore.deleteById(model.id, deleteCallBack)"
      />

      <menu-button-print @click="helper.print('invoicePreview')" />
      <menu-button
        @click="downloadPdf(model.id)"
        icon="download"
        :title="$t('shared.labels.downloadPdf')"
      />

      <menu-button
        @click="sendEmail(model.id)"
        icon="send"
        :title="$t('shared.labels.sendEmail')"
      />
    </template>
  </tool-bar>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { helper } from "src/helpers";
  import { useDialog } from "src/composables/useDialog";
  import { useFormActions } from "src/composables/useFormActions";
  import { useVoucherState } from "../../../_composables/useVoucherState";
  import { downloadManager } from "src/helpers";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import SendEmail from "../../shared/forms/SendEmailForm.vue";
  import MenuButton from "src/components/shared/buttons/MenuButton.vue";
  import MenuButtonCopy from "src/components/shared/buttons/MenuButtonCopy.vue";
  import MenuButtonDelete from "src/components/shared/buttons/MenuButtonDelete.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    baseRoute: String,
    crudStore: useFormActions,
  });

  const router = useRouter();
  const dialogStore = useDialog();
  const voucherStore = useVoucherState();

  function deleteCallBack() {
    voucherStore.state.firstLoad.value = false;
    router.back();
  }

  function sendEmail(id) {
    dialogStore.openDialog({
      title: `shared.labels.sendMail`,
      component: SendEmail,
      props: {
        id: id,
        baseRoute: props.baseRoute,
      },
      okCallback: async (response) => {
        //await reloadData();
      },
    });
  }

  const downloadPdf = (id) => {
    downloadManager.downloadGet(
      `${props.baseRoute}/generatePdf/${id}`
    );
  };
</script>
