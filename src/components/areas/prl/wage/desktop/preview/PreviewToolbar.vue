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

      <menu-button-print @click="openPreview" />
      <menu-button
        @click="printStore.downloadPdf()"
        icon="download"
        :title="$t('shared.labels.downloadPdf')"
      />

      <menu-button
        @click="sendEmail"
        icon="send"
        :title="$t('shared.labels.sendEmail')"
      />
    </template>
  </tool-bar>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { usePrint } from "src/composables/usePrint";
  import { downloadManager } from "src/helpers";
  import { usePreview } from "src/composables/usePreview";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import MenuButton from "src/components/shared/buttons/MenuButton.vue";
  import MenuButtonCopy from "src/components/shared/buttons/MenuButtonCopy.vue";
  import MenuButtonDelete from "src/components/shared/buttons/MenuButtonDelete.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";
  import DataGridPreview from "./printPreview/DataGridPreview.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    baseRoute: String,
    crudStore: Object,
  });

  const router = useRouter();
  const printStore = usePrint();
  const previewStore = usePreview();

  function deleteCallBack() {
    //voucherStore.state.firstLoad.value = false;
    router.back();
  }

  const downloadPdf = (id) => {
    downloadManager.downloadGet(
      `${props.baseRoute}/generatePdf/${id}`
    );
  };

  const openPreview = async () => {
    previewStore.openDialog({
      title: props.title,
      component: DataGridPreview,
      previewProps: {
        tableStore: props.crudStore,
        title: props.title,
        wageId: props.model?.id,
      },
    });
  };
</script>
