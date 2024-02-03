<template>
  <div class="text-h6">
    کالا / خدمت
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
    </template>

    <template #row-header="{ item }">
      <q-card-section class="bg-primary text-white">
        {{ item.code }} / {{ item.title }}
      </q-card-section>
    </template>

    <template #row-actions="{ item }">
      <q-btn
        round
        class="text-on-dark text-caption"
        :to="`/cmn/product/edit/${item.id}`"
        unelevated
      >
        <q-icon name="o_edit" />
      </q-btn>

      <q-btn
        round
        class="text-on-dark text-caption"
        :to="`/cmn/product/copy/${item.id}`"
        unelevated
      >
        <q-icon name="o_copy" />
      </q-btn>

      <q-btn
        round
        class="text-on-dark text-caption"
        unelevated
        @click="crudStore.deleteById(item, reloadData)"
      >
        <q-icon name="o_delete" />
      </q-btn>
    </template>

    <template #row-more-menus="{ item }">
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

  </data-grid>

  <bottom-sheet
    v-if="bottomSheetStatus"
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >
    <template #header>
      <div class="text-h6 q-pa-md">
        {{ selectedRow.code }} / {{ selectedRow.title }}
      </div>
    </template>

    <template #body>
      <q-list padding>
        <q-item
          clickable
          v-ripple
          :to="`/cmn/product/edit/${selectedRow.id}`"
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
          :to="`/cmn/product/copy/${selectedRow.id}`"
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
          @click="crudStore.deleteById(selectedRow.id, reloadData)"
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
import EditBatchDialog from "src/components/areas/cmn/product/shared/forms/EditBatchDialog.vue"

const props = defineProps({
  gridStore: Object
})

const $q = useQuasar()
const crudStore = useFormActions("cmn/product")
const dataGrid = ref(null)
const bottomSheetStatus = ref(false)
const selectedRow = ref(null)

const tableStore = computed(() => dataGrid.value?.tableStore)
const selectedIds = computed(() => tableStore.value?.selectedRows?.value.map(item => item.id))

const onBottomSheetShow = (row) => {
  selectedRow.value = row;
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
