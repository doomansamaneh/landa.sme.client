<template>
  <bottom-sheet header :status="status" @hide="hide">
    <template #header-title>
      {{ item.no }} / {{ item.subject }}
    </template>

    <template #body>
      <q-list padding>
        <menu-item-edit :to="`/${baseRoute}/edit/${item.id}`" />
        <menu-item-copy :to="`/${baseRoute}/copy/${item.id}`" />
        <q-separator class="q-my-sm" />
        <menu-item
          :title="$t('shared.labels.sendEmail')"
          icon="send"
          @click="sendEmail"
        />
        <q-separator class="q-my-sm" />
        <menu-item-print @click="downloadPdf" />
        <q-separator class="q-my-sm" />
        <menu-item-delete @click="deleteItem" />
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
  import { useDialog } from "src/composables/useDialog";
  import { useDataTable } from "src/composables/useDataTable";
  import { downloadManager } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";

  import BottomSheet from "components/shared/BottomSheet.vue";
  import SendEmail from "../../shared/forms/SendEmailForm.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";
  import MenuItemEdit from "src/components/shared/buttons/MenuItemEdit.vue";
  import MenuItemCopy from "src/components/shared/buttons/MenuItemCopy.vue";
  import MenuItemPrint from "src/components/shared/buttons/MenuItemPrint.vue";
  import MenuItemDelete from "src/components/shared/buttons/MenuItemDelete.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    status: Boolean,
    item: Object,
    deleteCallBack: Function,
    baseRoute: String,
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
      props: {
        id: props.item.id,
        baseRoute: props.baseRoute,
      },
      okCallback: async (response) => {
        //await reloadData();
      },
    });
  }

  const hide = () => {
    emits("hide");
  };
</script>
