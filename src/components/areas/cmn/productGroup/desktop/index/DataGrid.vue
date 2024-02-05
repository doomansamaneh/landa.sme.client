<template>
  <tool-bar
    :table-store="dataGrid?.tableStore"
    :crud-store="crudStore"
    base-route="/cmn/productGroup"
    activation
  >
  </tool-bar>

  <div class="q-mt-xl">
    <q-card class="bordered">
      <q-card-section class="bg-primary text-white">
        <div class="text-h5">{{ title }}</div>
      </q-card-section>
      <q-card-section>
        <data-grid
          ref="dataGrid"
          dataSource="cmn/productGroup/getGridData"
          :grid-store="gridStore"
          separator="horizontal"
          flat
          multiSelect
          numbered
          bordered
          wrapCells
          dense_
          expandable_
        >

          <template #filter-isActive="{ col }">
            <custom-select
              v-model="col.value"
              :options="isActiveOptions"
              @update:model-value="reloadData"
            />
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
            <row-tool-bar
              base-route="/cmn/productGroup"
              :item="item"
              :table-store="tableStore"
              :crud-store="crudStore"
            />
          </template>

        </data-grid>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

import { isActiveOptions } from "src/constants"
import { useFormActions } from "src/composables/useFormActions"

import ToolBar from "src/components/shared/ToolBar.vue"
import RowToolBar from "src/components/shared/RowToolBar.vue"
import CustomSelect from "src/components/shared/forms/CustomSelect.vue"
import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue"

const props = defineProps({
  gridStore: Object,
  title: String
})

const dataGrid = ref(null)
const crudStore = useFormActions("cmn/productGroup")

async function reloadData() {
  await tableStore.value.reloadData()
}

const tableStore = computed(() => dataGrid.value?.tableStore)
const selectedIds = computed(() => tableStore.value?.selectedRows?.value.map(item => item.id))

</script>
