<template>
  <div class="text-h6">
    {{ title }}
    <q-badge
      v-if="tableStore?.pagination.value.totalItems > 0"
      align="top"
      color="blue"
    >
      {{ tableStore?.pagination.value.totalItems }}
    </q-badge>
  </div>

  <data-grid
    ref="dataGrid"
    dataSource="cmn/product/getGridData"
    createUrl="/cmn/product/create"
    :grid-store="gridStore"
    multiSelect
    numbered
  >
    <template #body_="{ item }">
      <q-card class="q-my-md">
        <q-card-section>
          <i
            v-if="item.isActive"
            class="q-icon text-primary notranslate material-icons-outlined"
            aria-hidden="true"
            role="presentation"
          > done
          </i>
          <i
            v-else
            class="q-icon notranslate material-icons-outlined"
            aria-hidden="true"
            role="presentation"
          >
            cancel
          </i>

          {{ item.productGroupTitle }} / {{ item.code }} / {{ item.title }}
        </q-card-section>
      </q-card>
    </template>

    <template #cell-isActive="{ item }">
      <q-icon
        v-if="item.isActive"
        name="o_done"
      />
      <q-icon
        v-else
        name="o_cancel"
      />
    </template>

    <template #row-header="{ item }">
      <q-card-section class="bg-primary text-white">
        {{ item.code }} / {{ item.title }}
      </q-card-section>
    </template>

    <template #row-actions="{ item }">
      <row-tool-bar
        base-route="/cmn/product"
        :item="item"
        :table-store="tableStore"
        :crud-store="crudStore"
      >
        <template #more-items="{ item }">
          <span class="justify-end">
            <q-btn
              unelevated
              round
              @click="onBottomSheetShow(item)"
            >
              <q-icon name="o_more_vert" />
            </q-btn>
          </span>
        </template>
      </row-tool-bar>
    </template>
  </data-grid>

  <bottom-sheet
    v-if="bottomSheetStatus"
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >
    <template #header>
      {{ tableStore?.activeRow.value?.code }} / {{ tableStore?.activeRow.value?.title }}
    </template>

    <template #body>
      <q-list padding>
        <q-item
          clickable
          v-ripple
          :to="`/cmn/product/edit/${tableStore?.activeRow.value?.id}`"
        >
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark">
              <q-icon name="o_edit" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.edit") }}
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :to="`/cmn/product/copy/${tableStore?.activeRow.value?.id}`"
        >
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark">
              <q-icon name="o_copy" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.copy") }}
          </q-item-section>
        </q-item>

        <q-separator class="q-my-sm" />

        <q-item
          clickable
          v-ripple
          @click="crudStore.deleteById(tableStore?.activeRow.value?.id, reloadData)"
        >
          <q-item-section avatar>
            <q-avatar class="delete-avatar bg-on-dark red-shadow text-on-dark">
              <q-icon name="o_delete" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.delete") }}
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
import { ref, computed } from "vue"
import { useQuasar } from "quasar"
import { useFormActions } from "src/composables/useFormActions"

import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue"
import BottomSheet from "src/components/shared/BottomSheet.vue"
import ToolBar from "src/components/shared/ToolBar.vue"
import RowToolBar from "src/components/shared/RowToolBar.vue"
import EditBatchDialog from "src/components/areas/cmn/product/shared/forms/EditBatchDialog.vue"

const props = defineProps({
  gridStore: Object,
  title: String
})

const $q = useQuasar()
const crudStore = useFormActions("cmn/product")
const dataGrid = ref(null)
const bottomSheetStatus = ref(false)

const tableStore = computed(() => dataGrid.value?.tableStore)
const selectedIds = computed(() => tableStore.value?.selectedRows?.value.map(item => item.id))

const onBottomSheetShow = (row) => {
  bottomSheetStatus.value = true;
}

const onBottomSheetHide = () => {
  bottomSheetStatus.value = false;
}

async function loadData() {
  await dataGrid.value.resetPage()
}

async function reloadData() {
  await tableStore?.value.reloadData()
}

function editBatch() {
  $q.dialog({
    component: EditBatchDialog,
    componentProps: {
      selectedIds: selectedIds?.value,
    }
  }).onOk(async () => {
    await reloadData()
  })
}
</script>
