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

      <menu-button-print @click="printStore.handlePrint()" />
      <menu-button
        @click="printStore.downloadPdf()"
        icon="download"
        :title="$t('shared.labels.downloadPdf')"
      />
    </template>
  </tool-bar>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { helper } from "src/helpers";
  import { usePrint } from "src/composables/usePrint.js";

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
  const printStore = usePrint();

  function deleteCallBack() {
    //voucherStore.state.firstLoad.value = false;
    router.back();
  }
</script>
