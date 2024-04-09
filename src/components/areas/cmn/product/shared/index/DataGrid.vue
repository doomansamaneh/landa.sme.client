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
      <template #buttons-custom>
        <q-separator class="q-my-sm" />
        <q-item clickable v-close-popup tabindex="0" @click="editBatch">
          <q-item-section avatar>
            <q-avatar class="bg-on-dark" size="32px">
              <q-icon size="16px" name="o_edit" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-body3 no-letter-spacing">
              {{ $t("shared.labels.editBatch") }}
            </div>
          </q-item-section>
        </q-item>
      </template>
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
      :table-store="desktpGrid?.tableStore"
      :crud-store="crudStore"
      :title="title"
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
      :grid-store="gridStore"
      :crud-store="crudStore"
      :title="title"
      ref="desktpGrid"
    />
  </template>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useProductGrid } from "src/components/areas/cmn/_composables/useProductGrid";
import { useFormActions } from "src/composables/useFormActions";

import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
import Desktop from "src/components/areas/cmn/product/desktop/index/DataGrid.vue";
import ToolbarMobile from "components/shared/ToolBarMobile.vue";
import Mobile from "src/components/areas/cmn/product/mobile/index/DataGrid.vue";

import EditBatch from "src/components/areas/cmn/product/shared/forms/EditBatchDialog.vue";

const props = defineProps({
  toolbar: Boolean,
});

const { t } = useI18n();

const title = t("main-menu-items.Cmn_Product_View");
const baseRoute = "cmn/product";

const $q = useQuasar();
const gridStore = useProductGrid();
const crudStore = useFormActions(baseRoute);
const desktpGrid = ref(null);
const mobileGrid = ref(null);

const selectedIds = computed(() => {
  if (desktpGrid?.value != null)
    return desktpGrid.value.tableStore.selectedRows?.value.map(
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
