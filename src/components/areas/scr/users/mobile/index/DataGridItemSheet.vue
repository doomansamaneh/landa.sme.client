<template>
  <bottom-sheet header :status="status" @hide="hide">
    <template #header-title>
      {{ item.name }}
    </template>

    <template #body>
      <q-list padding>
        <menu-item-delete @click="deleteItem" />
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { useFormActions } from "src/composables/useFormActions";

  import BottomSheet from "components/shared/BottomSheet.vue";
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
