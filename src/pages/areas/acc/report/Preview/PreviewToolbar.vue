<template>
  <tool-bar
    :inside="inside"
    :margin="!inside"
    :title="title"
    buttons
    back-button
  >
    <template #buttons>
      <slot name="toolbar-custom-desktop"></slot>

      <menu-button-print @click="printStore.handlePrint" />
      <menu-button
        :title="$t('shared.labels.downloadPdf')"
        icon="download"
        @click="printStore.downloadPdf"
      />
      <!-- <menu-button
        :title="$t('shared.labels.sendEmail')"
        icon="send"
        @click="sendEmail"
      /> -->
    </template>
  </tool-bar>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { downloadManager } from "src/helpers";
  import { usePrint } from "src/composables/usePrint";
  import { useDialog } from "src/composables/useDialog";
  import { useQuoteState } from "src/components/areas/sls/_composables/useQuoteState";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  // import SendEmail from "../../shared/forms/SendEmailForm.vue";
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

  const printStore = usePrint();
  const router = useRouter();
  const dialogStore = useDialog();
  const quoteStore = useQuoteState();

  function deleteCallBack() {
    quoteStore.state.firstLoad.value = false;
    router.back();
  }

  function sendEmail() {
    dialogStore.openDialog({
      title: `shared.labels.sendMail`,
      component: SendEmail,
      actionBar: true,
      props: {
        id: props.model.id,
        baseRoute: props.baseRoute,
      },
      okCallback: async (response) => {
        await reloadData();
      },
    });
  }

  const downloadPdf = (id) => {
    downloadManager.downloadGet(
      `${props.baseRoute}/generatePdf/${id}`
    );
  };
</script>
