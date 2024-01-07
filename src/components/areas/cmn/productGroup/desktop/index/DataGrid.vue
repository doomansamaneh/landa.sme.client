<template>
  <div class="q-gutter-md q-mb-md">
    <q-btn
      class="bg-primary text-white text-caption"
      to="/cmn/productGroup/create"
      unelevated
    >
      <q-icon name="o_add" />
      {{ $t("shared.labels.create") }}
    </q-btn>

    <q-btn
      class="bg-primary text-white text-caption"
      unelevated
      @click="dataTable.tableStore.exportCurrentPage()"
    >
      <q-icon name="download" />
      {{ $t("shared.labels.exportExcelCurrentPage") }}
    </q-btn>
    <q-btn
      class="bg-primary text-white text-caption"
      unelevated
      @click="dataTable.tableStore.exportAll()"
    >
      <q-icon name="download" />
      {{ $t("shared.labels.exportExcel") }}
    </q-btn>

  </div>

  <data-grid
    ref="dataTable"
    dataSource="cmn/productGroup/getGridData"
    :grid-store="gridStore"
    separator="horizontal"
    flat
    multiSelect
    numbered
    bordered
    dense_
    wrapCells
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
      >
        done
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
      <q-btn
        class="bg-primary text-white text-caption"
        :to='getEditUrl(item)'
        unelevated
      >
        <q-icon name="o_edit" />
        {{ $t("shared.labels.edit") }}
      </q-btn>
    </template>
  </data-grid>
</template>

<script setup>
import { ref } from "vue"
import { isActiveOptions } from "src/constants"

import CustomSelect from "src/components/shared/Forms/CustomSelect.vue"
import DataGrid from "src/components/shared/DataTables/DataGrid.vue"
import { useProductGroup } from "src/components/areas/cmn/_composables/useProductGroup"

const dataTable = ref(null)
const gridStore = useProductGroup()

function getEditUrl(item) {
  return `/cmn/productGroup/edit/${item.id}`
}

async function reloadData() {
  await dataTable.value?.tableStore.reloadData()
}
</script>