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
      <span class="text-h6">گروه کالا و خدمت</span>
    </template>
    <template #buttons>
      <q-btn
        to="/cmn/productGroup/create"
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
      <template v-if="tableStore?.activeRow?.value != null">
        <q-btn
          class="bordered-btn_bg-dark text-caption"
          rounded
          unelevated
          no-caps
        ><q-icon
            name="o_edit"
            class="q-mr-xs"
          />
          {{ $t("shared.labels.edit") }} ({{ tableStore?.activeRow?.value?.no }})
        </q-btn>
      </template>
      <template v-if="selectedIds?.length > 0">
        <q-btn
          class="bordered-btn_bg-dark text-caption"
          rounded
          unelevated
          no-caps
          @click="deleteBatch"
        >
          <q-icon
            name="o_delete"
            class="q-mr-xs"
          />
          {{ $t("shared.labels.delete") }} ({{ selectedIds?.length }} rows)
        </q-btn>
      </template>
      <!-- <template v-else-if="tableStore?.activeRow?.value != null">
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
      </template> -->
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

        <q-menu
          fit
          :offset="[0, 20]"
        >
          <q-list
            dense
            padding
            style="width:200px"
          >
            <q-item
              clickable
              v-close-popup
              tabindex="0"
              @click="reloadData"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="dark-icon"
                    size="sm"
                  >
                    <q-icon name="o_refresh" />
                  </q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">تازه‌سازی</div>
              </q-item-section>
            </q-item>
            <q-separator />

            <template v-if="selectedIds?.length > 0">
              <q-item
                clickable
                v-close-popup
                tabindex="0"
                @click="activate"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar
                      class="dark-icon"
                      size="sm"
                    ><q-icon name="o_check" /></q-avatar>
                  </q-item-section>
                </div>
                <q-item-section>
                  <div class="text-caption">فعال سازی</div>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                tabindex="0"
                @click="deactivate"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar
                      class="dark-icon"
                      size="sm"
                    ><q-icon name="o_close" /></q-avatar>
                  </q-item-section>
                </div>
                <q-item-section>
                  <div class="text-caption">غیر‌فعال‌سازی</div>
                </q-item-section>
              </q-item>

              <q-separator />
            </template>

            <q-item
              clickable
              v-close-popup
              tabindex="0"
              @click="exportAll"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="dark-icon"
                    size="sm"
                  ><q-icon
                      name="o_download"
                      size="16px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">تبدیل به اکسل</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </tool-bar>

  <div class="q-mt-xl">
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
      <template #cell-actions="{ item }">
        <q-btn
          round
          class="text-on-dark text-caption"
          :to='getEditUrl(item)'
          unelevated
        >
          <q-icon name="o_edit" />
        </q-btn>

        <q-btn
          round
          class="text-on-dark text-caption"
          :to='getCopyUrl(item)'
          unelevated
        >
          <q-icon name="o_copy" />
        </q-btn>

        <q-btn
          round
          class="text-on-dark text-caption"
          unelevated
          @click="deleteRow(item)"
        >
          <q-icon name="o_delete" />
        </q-btn>
      </template>
    </data-grid>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useQuasar } from "quasar"
import { useFormActions } from "src/composables/useFormActions"

import ToolBar from "src/components/shared/ToolBar.vue"
import DataGrid from "src/components/shared/DataTables/mobile/DataGrid.vue"
import EditBatchDialog from "src/components/areas/cmn/product/shared/forms/EditBatchDialog.vue"

const props = defineProps({
  gridStore: Object
})

const dataGrid = ref(null)
const crudStore = useFormActions("cmn/productGroup")
const $q = useQuasar()

const tableStore = computed(() => dataGrid.value?.tableStore)
const selectedIds = computed(() => tableStore.value?.selectedRows?.value.map(item => item.id))

function getEditUrl(item) {
  return `/cmn/productGroup/edit/${item.id}`
}

function getCopyUrl(item) {
  return `/cmn/productGroup/copy/${item.id}`
}

async function loadData() {
  await dataGrid.value.resetPage()
}

async function reloadData() {
  await tableStore?.value.reloadData()
}

async function deleteRow(item) {
  await crudStore.deleteById(item.id, reloadData)
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
