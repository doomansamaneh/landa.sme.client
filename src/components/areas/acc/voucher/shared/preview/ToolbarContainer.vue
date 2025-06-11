<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :margin="!inside"
    :title="title"
    back-button
    :menu-items="menuItems"
  />
  <tool-bar-mobile
    v-else
    :inside="inside"
    :title="title"
    :model="model"
    :crud-store="crudStore"
    :base-route="baseRoute"
  />
</template>

<script setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { downloadManager } from "src/helpers";
  import { usePrint } from "src/composables/usePrint";
  import { useDialog } from "src/composables/useDialog";
  import { useVoucherState } from "../../../_composables/useVoucherState";
  import { useVoucherPreviewMenu } from "../../../_menus/useVoucherPreviewMenu";

  import SendEmailForm from "../forms/SendEmailForm.vue";
  import ToolBarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";
  import ToolBarMobile from "../../mobile/preview/PreviewToolbar.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
    crudStore: Object,
  });

  const router = useRouter();
  const dialogStore = useDialog();
  const voucherStore = useVoucherState();
  const printStore = usePrint();

  function deleteCallBack() {
    voucherStore.state.firstLoad.value = false;
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
    useVoucherPreviewMenu(context.value)
  );
</script>
