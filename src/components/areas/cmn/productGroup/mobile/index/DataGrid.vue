<template>
  <data-grid
    ref="dataGrid"
    dataSource="cmn/productGroup/getGridData"
    :grid-store="gridStore"
    createUrl="/cmn/productGroup/create"
    multiSelect
    numbered
  >
    <template #row-header="{ item }">
      <q-card-section class="bg-primary text-white">
        {{ item.title }}
      </q-card-section>
    </template>

    <template #row-actions="{ item }">
      <row-tool-bar
        base-route="/cmn/productGroup"
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
      <div class="text-h6 q-pa-md">
        {{ tableStore?.activeRow.value?.title }}
      </div>
    </template>

    <template #body>
      <q-list padding>
        <q-item
          clickable
          v-ripple
          :to="`/cmn/productGroup/edit/${tableStore?.activeRow.value?.id}`"
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
          :to="`/cmn/productGroup/copy/${tableStore?.activeRow.value?.id}`"
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
import RowToolBar from "src/components/shared/RowToolBar.vue"
import BottomSheet from "src/components/shared/BottomSheet.vue"

const props = defineProps({
  gridStore: Object,
  title: String
})

const $q = useQuasar()
const crudStore = useFormActions("cmn/productGroup")

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
  //await tableStore?.value.reloadData()
  await dataGrid.value.resetPage()
}

async function deleteBatch() {
  await crudStore.deleteBatch(selectedIds?.value, reloadData)
}

async function activate() {
  await crudStore.activate(selectedIds?.value, reloadData)
}

async function deactivate() {
  await crudStore.deactivate(selectedIds?.value, reloadData)
}

async function exportAll() {
  await tableStore.value.exportAll()
}
</script>
