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
      <span class="text-h6">{{ title }}</span>
    </template>

    <template #buttons>
      <q-btn
        to="/cmn/product/create"
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
          :to="`/cmn/product/edit/${tableStore?.activeRow?.value.id}`"
          class="bordered-btn_bg-dark text-caption"
          rounded
          unelevated
          no-caps
        >
          <q-icon
            name="o_edit"
            class="q-mr-xs"
          />
          {{ $t("shared.labels.edit") }} ({{ tableStore?.activeRow?.value?.code }})
        </q-btn>
      </template>

      <template v-if="selectedIds?.length > 0">
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

      <template v-if="selectedIds?.length > 0">
        <q-btn
          class="bordered-btn_bg-dark text-caption"
          rounded
          unelevated
          no-caps
          @click="crudStore.deleteBatch(selectedIds, reloadData)"
        >
          <q-icon
            name="o_delete"
            class="q-mr-xs"
          />
          {{ $t("shared.labels.delete") }} ({{ selectedIds?.length }} rows)
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
                @click="crudStore.activate(selectedIds, reloadData)"
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
                @click="crudStore.deactivate(selectedIds, reloadData)"
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
              @click="tableStore.value.exportAll()"
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

  <q-card>
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
            @click="crudStore.deleteById(item.id, reloadData)"
          >
            <q-icon name="o_delete" />
          </q-btn>
        </template>

      </data-grid>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from "vue"
import { useQuasar } from "quasar"
import { isActiveOptions } from "src/constants"
import { useFormActions } from "src/composables/useFormActions"

import ToolBar from "src/components/shared/ToolBar.vue"
import CustomSelect from "src/components/shared/forms/CustomSelect.vue"
import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue"
import EditBatchDialog from "src/components/areas/cmn/product/shared/forms/EditBatchDialog.vue"

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
