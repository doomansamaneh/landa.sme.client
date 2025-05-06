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

      <menu-button title="چاپ" icon="o_print">
        <q-menu class="border-radius-lg" cover>
          <q-list dense padding style="width: 220px">
            <menu-item
              icon="o_print"
              :title="$t('shared.labels.print')"
              @click="printStore.handlePrint()"
            />

            <menu-item
              :to="`/${baseRoute}/addressPreview/${model.id}`"
              icon="o_print"
              title="چاپ برچسب نشانی"
            />

            <menu-item
              v-if="$route.path.includes('sls/invoice/preview')"
              :to="`/${baseRoute}/ExitPreview/${model.id}`"
              icon="o_print"
              title="چاپ خروج از انبار"
            />

            <menu-item
              v-if="$route.path.includes('sls/purchase/preview')"
              :to="`/${baseRoute}/ReceiptPreview/${model.id}`"
              icon="o_print"
              title="چاپ رسید انبار"
            />
          </q-list>
        </q-menu>
      </menu-button>

      <menu-button
        :title="$t('shared.labels.downloadPdf')"
        icon="download"
        @click="downloadPdf"
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
  import { downloadManager } from "src/helpers";
  import { usePrint } from "src/composables/usePrint";
  import { useDialog } from "src/composables/useDialog";
  import { useQuoteState } from "src/components/areas/sls/_composables/useQuoteState";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import SendEmail from "../../shared/forms/SendEmailForm.vue";
  import MenuButton from "src/components/shared/buttons/MenuButton.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";
  import MenuButtonCopy from "src/components/shared/buttons/MenuButtonCopy.vue";
  import MenuButtonDelete from "src/components/shared/buttons/MenuButtonDelete.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";
  import MenuItem from "src/components/shared/Buttons/MenuItem.vue";

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

  const downloadPdf = () => {
    //printStore.downloadPdf()
    downloadManager.downloadGet(
      `${props.baseRoute}/generatePdf/${props.model.id}`
    );
  };
</script>
