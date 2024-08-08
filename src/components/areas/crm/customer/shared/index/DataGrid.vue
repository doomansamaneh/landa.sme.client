<template>
  <template v-if="$q.screen.lt.sm">
    <toolbar-mobile
      v-if="toolbar"
      buttons
      :title="title"
      :table-store="mobileGrid?.tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      activation
    />

    <mobile
      :title="title"
      :grid-store="localGridStore"
      :crud-store="crudStore"
      :data-source="dataSource"
      :base-route="baseRoute"
      :create-url="createUrl"
      :columns="columns"
      ref="mobileGrid"
    />
  </template>
  <template v-else>
    <toolbar-desktop
      v-if="toolbar"
      :title_="title"
      :table-store="desktopGrid?.tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      activation
      buttons
      margin
    >
      <template #buttons-batch-action>
        <q-btn
          padding="6px 12px"
          class="text-body2 no-letter-spacing"
          rounded
          unelevated
          no-caps
          @click="editBatch"
        >
          <q-icon size="20px" name="o_edit" class="q-mr-xs" />
          {{ $t("shared.labels.editBatch") }}
          <q-badge floating>
            {{ selectedIds?.length }}
          </q-badge>
        </q-btn>
      </template>
    </toolbar-desktop>
    <desktop
      :title="title"
      :grid-store="gridStore"
      :crud-store="crudStore"
      :data-source="dataSource"
      :base-route="baseRoute"
      ref="desktopGrid"
    ></desktop>
  </template>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { useCustomerState } from "src/components/areas/crm/_composables/useCustomerState";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import ToolbarMobile from "components/shared/ToolBarMobile.vue";
  import Desktop from "src/components/areas/crm/customer/desktop/index/DataGrid.vue";
  import Mobile from "src/components/areas/crm/customer/mobile/index/DataGrid.vue";
  import EditBatch from "../forms/EditBatchDialog.vue";

  const props = defineProps({
    toolbar: Boolean,
    visibleColumns: Array,
    title: String,
  });
  const $q = useQuasar();
  const gridStore = useCustomerState();

  const dataSource = "crm/customer/GetGridData";
  const baseRoute = "crm/customer";
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

  function editBatch() {
    $q.dialog({
      component: EditBatch,
      componentProps: {
        selectedIds: selectedIds?.value,
      },
    }).onOk(async () => {
      await reloadData();
    });
  }
</script>
