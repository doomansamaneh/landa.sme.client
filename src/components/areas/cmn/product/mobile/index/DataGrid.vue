<template>
  <data-grid
    ref="dataGrid"
    dataSource="cmn/product/getGridData"
    :grid-store="gridStore"
    class="q-mt-xl"
    separator="horizontal"
    flat
    multiSelect
    numbered
    bordered
    wrapCells
    dense_
    expandable_
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
        style="font-size: 18px;"
      > done
      </i>
      <i
        v-else
        class="q-icon notranslate material-icons-outlined"
        aria-hidden="true"
        role="presentation"
        style="font-size: 18px;"
      >
        cancel
      </i>
    </template>

    <template #cell-actions="{ item }">
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
        @click="crudStore.deleteRow(item, reloadData)"
      >
        <q-icon name="o_delete" />
      </q-btn>
    </template>

  </data-grid>
</template>

<script setup>
import { ref, computed } from "vue"
import { useQuasar } from "quasar"
import { useFormActions } from "src/composables/useFormActions"

import DataGrid from "src/components/shared/DataTables/mobile/DataGrid.vue"
import EditBatchDialog from "src/components/areas/cmn/product/shared/forms/EditBatchDialog.vue"

const props = defineProps({
  gridStore: Object
})

const dataGrid = ref(null)
const crudStore = useFormActions("cmn/product")
const $q = useQuasar()

const tableStore = computed(() => dataGrid.value?.tableStore)
const selectedIds = computed(() => tableStore.value?.selectedRows?.value.map(item => item.id))

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
