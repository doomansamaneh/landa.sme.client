<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      v-if="toolbar"
      buttons
      :table-store="mobileGrid?.tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      activation
    >
    </toolbar-mobile>

    <mobile
      :grid-store="gridStore"
      :crud-store="crudStore"
      :title="title"
      ref="mobileGrid"
    />
  </template>
  <template v-else>
    <toolbar-desktop
      v-if="toolbar"
      :table-store="desktopGrid?.tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      buttons
    >
    </toolbar-desktop>
    <desktop
      :grid-store="gridStore"
      :crud-store="crudStore"
      :title="title"
      data-source="sls/invoice/getGridData"
      ref="desktopGrid"
    />
  </template>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useInvoiceGrid } from "src/components/areas/sls/_composables/useInvoiceGrid";
import { useFormActions } from "src/composables/useFormActions";

import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
import ToolbarMobile from "components/shared/ToolBarMobile.vue";
import Desktop from "src/components/areas/sls/invoice/desktop/index/DataGrid.vue";
import Mobile from "src/components/areas/sls/invoice/mobile/index/DataGrid.vue";

//import EditBatch from "src/components/areas/sls/invoice/shared/forms/EditBatchDialog.vue";

const props = defineProps({
  toolbar: Boolean,
});

const { t } = useI18n();

const title = t("main-menu-items.Sls_Invoice_View");
const baseRoute = "sls/Invoice";

const $q = useQuasar();
const gridStore = useInvoiceGrid();
const crudStore = useFormActions(baseRoute);
const desktopGrid = ref(null);
const mobileGrid = ref(null);

const selectedIds = computed(() => {
  if (desktopGrid?.value != null)
    return desktopGrid.value.tableStore.selectedRows?.value.map(
      (item) => item.id
    );
  else
    return mobileGrid.value.tableStore.selectedRows?.value.map(
      (item) => item.id
    );
});

// function editBatch() {
//   $q.dialog({
//     component: EditBatch,
//     componentProps: {
//       selectedIds: selectedIds?.value,
//     },
//   }).onOk(async () => {
//     await reloadData();
//   });
// }
</script>
