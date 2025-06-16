<template>
  <bottom-sheet header :status="status" @hide="hide">
    <template #header-title>
      {{ item.no }} / {{ item.subject }}
    </template>

    <template #body>
      <q-list padding>
        <menu-item-edit :to="`/${baseRoute}/edit/${item.id}`" />
        <q-separator class="q-my-sm" />
        <menu-item-print @click="downloadPdf" />
        <q-separator class="q-my-sm" />
        <menu-item-delete @click="deleteItem" />
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { downloadManager } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";

  import BottomSheet from "components/shared/BottomSheet.vue";
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
  const $q = useQuasar();

  const emits = defineEmits(["hide"]);
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

  const hide = () => {
    emits("hide");
  };
</script>
