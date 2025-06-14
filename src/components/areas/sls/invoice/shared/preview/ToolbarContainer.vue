<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :margin="!inside"
    :title="title"
    :menu-items="menuItems"
  />
  <tool-bar-mobile
    v-else
    :inside="inside"
    :title="title"
    :model="model"
    :crud-store="crudStore"
    :base-route="baseRoute"
    :menu-items="menuItems"
  />
</template>

<script setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { downloadManager } from "src/helpers";
  import { usePrint } from "src/composables/usePrint";
  import { useDialog } from "src/composables/useDialog";
  import { useInvoiceState } from "../../../_composables/useInvoiceState";
  import { useInvoicePreviewMenu } from "../../../_menus/useInvoicePreviewMenu";

  import SendEmailForm from "../../../_shared/invoice/shared/forms/SendEmailForm.vue";
  import ToolBarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";
  import ToolBarMobile from "src/components/shared/DynamicToolBarMobile.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    backButton: Boolean,
    margin: Boolean,
    baseRoute: String,
    crudStore: Object,
  });

  const router = useRouter();
  const dialogStore = useDialog();
  const invoiceStore = useInvoiceState();
  const printStore = usePrint();

  function deleteCallBack() {
    invoiceStore.reset();
    router.back();
  }

  function sendMail() {
    dialogStore.openDialog({
      title: `shared.labels.sendMail`,
      component: SendEmailForm,
      actionBar: true,
      props: {
        id: props.model?.id,
        baseRoute: props.baseRoute,
      },
      okCallback: async (response) => {
        //await reloadData();
      },
    });
  }

  const downloadPdf = () => {
    downloadManager.downloadGet(
      `${props.baseRoute}/generatePdf/${props.model?.id}`
    );
  };

  const context = computed(() => ({
    activeRow: props.model,
    downloadPdf,
    sendMail,
    print: () => printStore.handlePrint(),
    deleteById: () =>
      props.crudStore?.deleteById(props.model?.id, deleteCallBack),
  }));

  const menuItems = computed(() =>
    useInvoicePreviewMenu(context.value)
  );
</script>
