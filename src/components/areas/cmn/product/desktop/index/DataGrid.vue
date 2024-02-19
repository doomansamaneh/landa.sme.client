<template>
  <tool-bar
    :table-store="dataGrid?.tableStore"
    :crud-store="crudStore"
    :title="title"
    base-route="/cmn/product"
    activation
  >
    <template #buttons-batch-action>
      <q-btn
        class="text-caption"
        rounded
        unelevated
        no-caps
        @click="editBatch"
      >
        <q-icon
          name="o_edit"
          class="q-mr-xs"
        />
        {{ $t("shared.labels.editBatch") }} ({{ selectedIds?.length }} مورد)
      </q-btn>
    </template>
  </tool-bar>
  <!-- ----------------------------------------------- -->
  <!-- Persian tools library tools:
  <br />
  <a href="https://github.com/persian-tools/persian-tools">persian tools</a>
  <input
    type="number"
    v-model="numbersInput"
  />
  <p>Result: {{ convertedNumber }}</p> -->
  <!-- ---------------------------------------------- -->
  <div>
    <!-- <q-card-section class="bg-primary text-white">
      <div class="text-h5">{{ title }}</div>
    </q-card-section> -->
    <div>
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

        <template #cell-code="{ item }">
          {{ item.code }}
          <div v-if="item.taxCode">
            <small class="caption-on-dark">
              tax: {{ item.taxCode }}
            </small>
          </div>
        </template>

        <template #cell-isActive="{ item }">
          <q-btn
            v-if="item.isActive"
            round
            dense
            size="10px"
            unelevated
            icon="o_done"
            color="green-8"
            class="green-shadow no-pointer-events"
          />
          <q-btn
            v-else
            round
            dense
            size="10px"
            unelevated
            icon="o_close"
            color="negative"
            class="red-shadow no-pointer-events"
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
    </div>
  </div>
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
