<template>
  <menu-item-edit :to="`/${baseRoute}/edit/${item.id}`" />
  <menu-item-copy :to="`/${baseRoute}/copy/${item.id}`" />
  <q-separator class="q-my-sm" />
  <menu-item
    :title="$t('shared.labels.cancelInvoice')"
    icon="o_close"
    @click="cancelInvoice(item.id)"
  />

  <menu-item
    :title="$t('shared.labels.copyToPurchase')"
    icon="o_shopping_cart"
    :to="`/sls/purchase/createFromInvoice/${item.id}`"
  />

  <menu-item
    :title="$t('shared.labels.salesReturn')"
    icon="o_undo"
    :to="`/sls/salesReturn/createFromInvoice/${item.id}`"
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
  import { useInvoiceModel } from "../../../_composables/useInvoiceModel";

  import MenuItem from "src/components/shared/buttons/MenuItem.vue";
  import MenuItemEdit from "src/components/shared/buttons/MenuItemEdit.vue";
  import MenuItemCopy from "src/components/shared/buttons/MenuItemCopy.vue";
  import MenuItemPrint from "src/components/shared/buttons/MenuItemPrint.vue";
  import MenuItemDelete from "src/components/shared/buttons/MenuItemDelete.vue";
  import SendEmailForm from "src/components/areas/_shared/forms/SendEmailForm.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: { type: String, default: "sls/invoice" },
    title: String,
    status: Boolean,
    item: Object,
    deleteCallBack: Function,
  });

  const dialogStore = useDialog();
  const crudStore = useFormActions(props.baseRoute);
  const formStore = useInvoiceModel({ baseRoute: props.baseRoute });

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

  const cancelInvoice = async (id) => {
    await formStore.cancelInvoice(id, reloadData);
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

  const reloadData = async () => {
    await props.tableStore?.reloadData();
  };
</script>
