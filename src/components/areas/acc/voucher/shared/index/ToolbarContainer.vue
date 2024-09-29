<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
    ></toolbar-mobile>
  </template>
  <template v-else>
    <toolbar-desktop
      :table-store="tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      :selected-ids="selectedIds"
      buttons
      margin
      @reorder="operationStore.reorder(tableStore.reloadData)"
    ></toolbar-desktop>
  </template>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";

  import { useFormActions } from "src/composables/useFormActions";
  import { useAccountingOperations } from "../../../_composables/useAccountingOperations";

  import ToolbarMobile from "../../mobile/index/ToolBar.vue";
  import ToolbarDesktop from "../../desktop/index/ToolBar.vue";
  import { useDataTable } from "src/composables/useDataTable";

  //import EditBatch from "../../desktop/forms/edi";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const baseRoute = "acc/voucher";
  const $q = useQuasar();

  const crudStore = useFormActions(baseRoute);
  const operationStore = useAccountingOperations();

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );
</script>
