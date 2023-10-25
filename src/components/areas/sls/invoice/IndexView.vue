<template>
  <tool-bar>
    <template #header>
      <q-badge
        v-if="tableStore?.pagination.value.totalItems > 0"
        rounded
        outline
        :label="tableStore?.pagination.value.totalItems"
        class="q-mr-sm bg-dark text-on-dark text-body2"
      />
      <span class="text-h6">فاکتورهای فروش</span>
    </template>
    <template #buttons>
      <q-btn
        class="bg-primary text-white text-caption"
        padding="6px 12px"
        rounded
        no-caps
        unelevated
      >
        <q-icon
          name="o_add"
          class="q-mr-xs"
        />
        {{ $t("shared.labels.create") }}
      </q-btn>
      <template v-if="invoiceStore.state.activeRow?.value != null">
        <q-btn
          class="bordered-btn_bg-dark text-caption"
          rounded
          unelevated
          no-caps
        ><q-icon
            name="o_edit"
            class="q-mr-xs"
          />
          {{ $t("shared.labels.edit") }} ({{ invoiceStore.state.activeRow?.value?.no }})
        </q-btn>
      </template>
      <template v-if="tableStore?.selectedRows?.value?.length > 0">
        <q-btn
          class="bordered-btn_bg-dark text-caption"
          rounded
          unelevated
          no-caps
        >
          <q-icon
            name="o_delete"
            class="q-mr-xs"
          />
          {{ $t("shared.labels.delete") }} ({{ tableStore?.selectedRows?.value?.length }} rows)
        </q-btn>
      </template>
      <template v-else-if="tableStore?.activeRow?.value != null">
        <q-btn
          class="bordered-btn_bg-dark text-caption"
          rounded
          unelevated
        >
          <q-icon
            name="o_delete"
            class="q-mr-xs"
          />
          {{ $t("shared.labels.delete") }} ({{ tableStore?.activeRow?.value?.no }})
        </q-btn>
      </template>
      <q-btn
        class="bordered-btn_bg-dark text-caption"
        rounded
        unelevated
      >
        <q-icon
          name="more_horiz"
          class="q-mr-xs"
        />
        {{ $t("shared.labels.more") }}
      </q-btn>
    </template>
  </tool-bar>

  <div class="q-my-md">
    <advanced-search
      :grid-store="invoiceStore"
      @apply-search="applySearch"
    />
  </div>

  <div class="bordered_">
    <!-- <div class="row items-center q-gutter-md">
      <q-btn
        v-if="gridI1?.activeRow != null"
        flat
        class="bg-primary text-white"
        no-caps
      >
        edit (invoice no: {{ gridI1?.activeRow.no }})
      </q-btn>
      <div>
        <q-btn
          v-if="gridI1?.selectedRows.length > 0"
          flat
          class="bg-secondary text-white"
          no-caps
        >
          delete all ({{ gridI1?.selectedRows.length }} rows selected)
        </q-btn>
      </div>
    </div> -->

    <q-tabs
      v-model="tab"
      class="border-radius-xs bg-primary text-white q-mt-xl"
      indicator-color="white"
      align="left"
      inline-label
      narrow-indicator
    >

      <!-- <q-tabs
      v-model="tab"
      inline-label
      align="left"
      class="bg-dark text-grey"
      narrow-indicator
    > -->
      <q-tab
        name="invoice"
        label="فاکتورهای فروش"
        icon="check"
        class="text-on-dark_"
      />
      <q-tab
        name="canceled"
        label="ابطال شده"
        icon="o_cancel"
        class="text-on-dark_"
      />
    </q-tabs>

    <q-tab-panels
      class="bordered border-radius-xs q-mt-md"
      v-model="tab"
      animated
    >
      <q-tab-panel name="invoice">
        <invoice ref="invoiceTable" />
      </q-tab-panel>

      <q-tab-panel name="canceled">
        <grid-v2 ref="canceledInvoiceTable" />
      </q-tab-panel>
    </q-tab-panels>
  </div>

  <div v-if="false">
    <template v-if="gridI1?.allSelectedIds.length > 0">
      <h4>all selected ids: {{ gridI1?.allSelectedIds.length }}</h4>
      <pre>{{ gridI1?.allSelectedIds }}</pre>
    </template>

    <template v-if="gridI1?.selectedRows.length > 0">
      <h4>selected rows: {{ gridI1?.selectedRows.length }}</h4>
      <pre>{{ gridI1?.selectedRows }}</pre>
    </template>

    <template v-if="gridI1?.activeRow != null">
      <h4>active row</h4>
      <pre>{{ gridI1?.activeRow }}</pre>
    </template>
  </div>

  <div-table
    v-if="false"
    style="width: 100%;"
  ></div-table>
</template>

<script setup>
import { computed, ref } from "vue"
import { useInvoice } from "../_composables/useInvoice"
import Invoice from "./_InvoiceDataTable.vue"
import AdvancedSearch from "./_AdvancedSearch.vue"
import GridV2 from "./IndexViewV2.vue"
import DivTable from "src/components/shared/DataTables/DataGridDiv.vue"
import ToolBar from "src/components/shared/ToolBar.vue"

const invoiceStore = useInvoice()
const invoiceTable = ref(null)
const canceledInvoiceTable = ref(null)

const tab = ref('invoice')

const tableStore = computed(() => invoiceTable.value?.dataTable.tableStore ?? canceledInvoiceTable.value?.dataTable.tableStore)
//const tableStore = computed(() => invoiceTable.value?.dataTable.tableStore)

async function applySearch(model) {
  await tableStore.value.reloadData()
}
</script>
