<template>
  <tool-bar
    :table-store="dataGrid?.tableStore"
    :crud-store="crudStore"
    :title="title"
    base-route="/cmn/product"
    activation
  >
    <template #bottons-custom>
      <q-separator class="q-my-sm" />
      <q-item
        clickable
        v-close-popup
        tabindex="0"
        @click="editBatch"
      >
        <div class="q-py-sm">
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark"
              size="sm"
            >
              <q-icon name="o_edit" /></q-avatar>
          </q-item-section>
        </div>
        <q-item-section>
          <div class="text-caption">
            {{ $t("shared.labels.editBatch") }}
          </div>
        </q-item-section>
      </q-item>

    </template>
  </tool-bar>

  <div style="margin-top: 56px;">
    <data-grid
      ref="dataGrid"
      dataSource="cmn/product/getGridData"
      createUrl="/cmn/product/create"
      :grid-store="gridStore"
      multiSelect
      numbered
    >
      <template #body="{ item }">
        <q-card
          class="bordered"
          :class="tableStore?.getRowClass(item)"
          v-touch-hold.capture="() => selectCard(item)"
        >

          <q-card-section>
            <div class="row items-center justify-center">
              <q-btn
                v-if="!item.selected"
                round
                unelevated
                class="no-pointer-events"
              >

                <q-avatar
                  size="56px"
                  text-color="white"
                  :style="{ backgroundColor: helper.generateDarkAvatarColor(item.title) }"
                >
                  <div class="char text-body1 text-bold">
                    {{ helper.getFirstChar(item.title) }}
                  </div>
                </q-avatar>
              </q-btn>
              <q-btn
                round
                unelevated
                class="no-pointer-events"
                v-else
              >
                <q-avatar
                  size="50px"
                  color="primary"
                  text-color="white"
                >
                  <q-icon
                    name="o_done"
                    size="md"
                  />
                </q-avatar>
              </q-btn>
            </div>

            <div class="row justify-between items-center">

              <div class="col row items-center">
                <span class="text-caption text-on-dark">{{ item.productGroupTitle }}</span>
              </div>

              <div class="col row justify-end items-center q-gutter-xs">
                <span class="text-caption text-on-dark">{{ item.code }}</span>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="column q-gutter-sm">

              <div class="row items-center q-px-sm">
                <div class="col-3">
                  <span class="text-caption text-on-dark">عنوان</span>
                </div>
                <div class="col">
                  <span class="ellipsis-2-lines text-caption text-bold text-on-dark">{{ item.title }}</span>
                </div>
              </div>

              <div class="row items-center q-px-sm">
                <div class="col-3">
                  <span class="text-caption text-on-dark">وضعیت</span>
                </div>
                <div class="col">
                  <q-btn
                    v-if="item.isActive"
                    round
                    unelevated
                    dense
                    class="green-shadow no-pointer-events"
                    size="8px"
                    color="green-8"
                    icon="o_done"
                  />
                  <q-btn
                    v-else
                    round
                    unelevated
                    dense
                    class="green-shadow no-pointer-events"
                    size="8px"
                    color="green-8"
                    icon="o_close"
                  />
                </div>
              </div>

            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions
            class="q-pa-md"
            align="between"
          >
            <q-btn
              unelevated
              class="text-on-dark"
            >
              <span class="text-body3 text-bold">مشاهده جزئیات</span>
            </q-btn>

            <q-btn
              round
              unelevated
              dense
              icon="o_more_vert"
              @click="onBottomSheetShow"
            />
          </q-card-actions>

        </q-card>
      </template>

      <template #cell-isActive="{ item }">
        <q-btn
          v-if="item.isActive"
          round
          unelevated
          dense
          class="no-pointer-events"
          size="10px"
          color="primary"
          icon="o_done"
        />
        <q-btn
          v-else
          round
          unelevated
          dense
          class="no-pointer-events"
          size="10px"
          color="negative"
          icon="o_close"
        />
      </template>

      <template #row-header="{ item }">
        <q-card-section>
          <div class="row justify-between items-center">

            <div class="col row items-center">
              <span class="text-caption text-on-dark">{{ item.code }}</span>
            </div>

            <div class="col row justify-end items-center q-gutter-xs">
              <span class="text-caption text-on-dark">{{ item.productGroupTitle }}</span>
            </div>

          </div>
          <q-separator class="q-mt-xs" />
        </q-card-section>
      </template>

      <template #row-actions>
        <q-btn
          unelevated
          class="text-on-dark"
        >
          <span class="text-body3 text-bold">مشاهده جزئیات</span>
        </q-btn>

        <q-btn
          round
          unelevated
          dense
          icon="o_more_vert"
          @click="onBottomSheetShow"
        />
        <!-- <row-tool-bar
          base-route="/cmn/product"
          :item="item"
          :table-store="tableStore"
          :crud-store="crudStore"
        >
          <template #more-items="{ item }">
            <div class="justify-end">
              <q-btn
                unelevated
                round
                @click="onBottomSheetShow(item)"
              >
                <q-icon name="o_more_vert" />
              </q-btn>
            </div>
          </template>
        </row-tool-bar> -->
      </template>
    </data-grid>
  </div>

  <bottom-sheet
    v-if="bottomSheetStatus"
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >
    <template #header-title>
      {{ tableStore?.activeRow.value?.code }} / {{ tableStore?.activeRow.value?.title }}
    </template>

    <template #body>
      <q-list padding>
        <q-item
          clickable
          v-ripple
          :to="`/cmn/product/edit/${tableStore?.activeRow.value?.id}`"
        >
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark">
              <q-icon name="o_edit" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body3 no-letter-spacing">
            {{ $t("shared.labels.edit") }}
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :to="`/cmn/product/copy/${tableStore?.activeRow.value?.id}`"
        >
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark">
              <q-icon name="o_copy" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body3 no-letter-spacing">
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

          <q-item-section class="text-body3 no-letter-spacing">
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
import { helper } from "src/helpers"

import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue"
import BottomSheet from "src/components/shared/BottomSheet.vue"
import ToolBar from "src/components/shared/ToolBarMobile.vue"
import EditBatchDialog from "src/components/areas/cmn/product/shared/forms/EditBatchDialog.vue"

const props = defineProps({
  gridStore: Object,
  title: String
})

const $q = useQuasar()
const crudStore = useFormActions("cmn/product")
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

async function reloadData() {
  await tableStore?.value.reloadData()
}

function setActiveRow(row) {
  tableStore.value.setActiveRow(row)
}

function selectCard(row) {
  setActiveRow(row)
  selectRow(row, !row.selected)
}

function selectRow(row, checked) {
  tableStore.value.selectRow(row, checked)
  // emitselectedRows()
}

// function setActiveRow(row) {
//   tableStore.value.setActiveRow(row)
// }

// function selectCard(row) {
//   if (tableStore.value?.selectedRows.value.length > 1) {
//     selectCard(row)
//     selectRow(row, !row.selected)
//   } else {
//     setActiveRow(row)
//   }
// }

// const handleSelect = (row) => {
//   if (tableStore.value?.selectedRows?.value.length > 1) {
//     selectCard(row)
//     setActiveRow(row)
//   } else {
//     setActiveRow(row)
//   }
// }

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
