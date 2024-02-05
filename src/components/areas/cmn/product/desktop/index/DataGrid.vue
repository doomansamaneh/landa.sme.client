<template>
  <tool-bar
    :table-store="dataGrid?.tableStore"
    :crud-store="crudStore"
    base-route="/cmn/product"
  >
    <template #buttons-batch-action>
      <q-btn
        class="bordered-btn_bg-dark text-caption"
        rounded
        unelevated
        no-caps
        @click="editBatch"
      >
        <q-icon
          name="o_edit"
          class="q-mr-xs"
        />
        {{ $t("shared.labels.editBatch") }} ({{ selectedIds?.length }} rows)
      </q-btn>
    </template>
  </tool-bar>
  <!-- ----------------------------------------------- -->
  Persian tools library tools:
  <br />
  <a href="https://github.com/persian-tools/persian-tools">persian tools</a>
  <input
    type="number"
    v-model="numbersInput"
  />
  <p>Result: {{ convertedNumber }}</p>
  <!-- ---------------------------------------------- -->
  <q-card class="bordered">
    <q-card-section class="bg-primary text-white">
      <div class="text-h5">{{ title }}</div>
    </q-card-section>
    <q-card-section>
      <data-grid
        ref="dataGrid"
        dataSource="cmn/product/getGridData"
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
          <q-icon
            v-if="item.isActive"
            name="o_done"
          />
          <q-icon
            v-else
            name="o_cancel"
          />
        </template>

        <template #cell-actions="{ item }">
          <row-tool-bar
            base-route="/cmn/product"
            :item="item"
            :table-store="tableStore"
            :crud-store="crudStore"
          />
        </template>

      </data-grid>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue"
import { useQuasar } from "quasar"
import { isActiveOptions } from "src/constants"
import { useFormActions } from "src/composables/useFormActions"

/////////////////////////////////////////////////////////////////
import { numberToWords } from "@persian-tools/persian-tools";
//////////////////////////////////////////////////////////////////

import ToolBar from "src/components/shared/ToolBar.vue"
import RowToolBar from "src/components/shared/RowToolBar.vue"
import CustomSelect from "src/components/shared/forms/CustomSelect.vue"
import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue"
import EditBatchDialog from "src/components/areas/cmn/product/shared/forms/EditBatchDialog.vue"

/////////////////////////////////
const numbersInput = ref(1379);
const convertedNumber = ref();

watchEffect(() => {
  const converted = numberToWords(numbersInput.value);
  convertedNumber.value = converted;
});
////////////////////////////////////

const props = defineProps({
  gridStore: Object,
  title: String
})

const dataGrid = ref(null)
const crudStore = useFormActions("cmn/product")
const $q = useQuasar()

async function reloadData() {
  await tableStore.value.reloadData()
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

const tableStore = computed(() => dataGrid.value?.tableStore)
const selectedIds = computed(() => tableStore.value?.selectedRows?.value.map(item => item.id))
</script>
