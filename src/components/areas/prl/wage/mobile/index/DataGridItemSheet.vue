<template>
  <bottom-sheet header :status="status" @hide="hide">
    <template #header-title>
      دوره: {{ item.year }} / {{ item.month }}
    </template>

    <template #body>
      <q-list padding>
        <menu-item-edit :to="`/${baseRoute}/edit/${item.id}`" />
        <menu-item-copy :to="`/${baseRoute}/copy/${item.id}`" />
        <q-separator class="q-my-sm" />
        <menu-item
          icon="o_save"
          :title="$t('shared.labels.downloadInsurrance')"
          @click="exportInsurance(item.id)"
        />

        <menu-item
          icon="o_save"
          :title="$t('shared.labels.downloadTax')"
          @click="exportTax(item.id)"
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
  import { useDataTable } from "src/composables/useDataTable";
  import { downloadManager } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";

  import BottomSheet from "components/shared/BottomSheet.vue";
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
  const crudStore = useFormActions(props.baseRoute);

  const deleteItem = () => {
    crudStore.deleteById(
      props.item.id,
      props.deleteCallBack ?? props.tableStore?.reloadData
    );
  };

  function downloadPdf(id) {
    downloadManager.downloadGet(
      `${props.baseRoute}/GeneratePdf/${id}`,
      "landa-payroll"
    );
  }

  function exportTax(id) {
    downloadManager.downloadGet(
      `${props.baseRoute}/exportTax/${id}`,
      "landa-tax"
    );
  }

  function exportInsurance(id) {
    downloadManager.downloadGet(
      `${props.baseRoute}/exportInsurance/${id}`,
      "landa-insurance"
    );
  }

  const hide = () => {
    emits("hide");
  };
</script>
