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
        @click="
          formStore.crudStore.deleteById(model.id, deleteCallBack)
        "
      />

      <menu-button-print @click="helper.print('invoicePreview')" />
      <menu-button
        @click="formStore.downloadPdf(model.id)"
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
  import { helper } from "src/helpers";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
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
    formStore: Object,
  });

  const router = useRouter();

  function deleteCallBack() {
    //voucherStore.state.firstLoad.value = false;
    router.back();
  }
</script>
