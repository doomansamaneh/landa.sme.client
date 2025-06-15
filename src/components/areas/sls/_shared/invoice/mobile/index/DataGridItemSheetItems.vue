<template>
  <menu-item-edit :to="`/${baseRoute}/edit/${item.id}`" />
  <menu-item-copy :to="`/${baseRoute}/copy/${item.id}`" />
  <menu-item
    v-if="item.statusId !== quoteStatus.final"
    :title="$t('shared.labels.convertToInvoice')"
    icon="o_receipt"
    :to="`/sls/invoice/createFromQuote/${item.id}`"
  />
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
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { quoteStatus } from "src/constants";

  import SendEmailForm from "src/components/areas/_shared/forms/SendEmailForm.vue";
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
  const formStore = useInvoiceModel({ baseRoute: props.baseRoute });

  function cancelInvoice(id) {
    formStore.cancelInvoice(id, reloadData);
  }

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
      component: SendEmailForm,
      actionBar: true,
      props: {
        id: props.item.id,
        baseRoute: props.baseRoute,
      },
      okCallback: async (response) => {
        //await reloadData();
      },
    });
  }

  function reloadData() {
    props.tableStore?.reloadData();
  }
</script>
