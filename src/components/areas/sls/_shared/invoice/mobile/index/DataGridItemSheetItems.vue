<template>
  <menu-item-edit :to="`/${baseRoute}/edit/${item.id}`" />
  <menu-item-copy :to="`/${baseRoute}/copy/${item.id}`" />
  <q-separator class="q-my-sm" />
  <menu-item
    :title="$t('shared.labels.sendEmail')"
    icon="send"
    @click="sendEmail"
  />
  <menu-item-print
    :title="$t('shared.labels.downloadPdf')"
    @click="downloadPdf"
  />
  <q-separator class="q-my-sm" />
  <menu-item-delete @click="deleteItem" />
</template>

<script setup>
  import { useDialog } from "src/composables/useDialog";
  import { useDataTable } from "src/composables/useDataTable";
  import { downloadManager } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";

  import SendEmail from "../../shared/forms/SendEmailForm.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";
  import MenuItemEdit from "src/components/shared/buttons/MenuItemEdit.vue";
  import MenuItemCopy from "src/components/shared/buttons/MenuItemCopy.vue";
  import MenuItemPrint from "src/components/shared/buttons/MenuItemPrint.vue";
  import MenuItemDelete from "src/components/shared/buttons/MenuItemDelete.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    item: Object,
    deleteCallBack: Function,
  });
  const emits = defineEmits(["hide"]);

  const dialogStore = useDialog();
  const crudStore = useFormActions(props.baseRoute);

  const downloadPdf = () => {
    downloadManager.downloadGet(
      `${props.baseRoute}/generatePdf/${props.item.id}`
    );
  };

  const deleteItem = () => {
    crudStore.deleteById(
      props.item.id,
      props.deleteCallBack ?? props.tableStore?.reloadData
    );
  };

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
        //await reloadData();
      },
    });
  }
</script>
