<template>
  <q-page-sticky
    class="z-1 bg-main"
    position="top"
    expand
  >
    <q-toolbar
      class="q-py-md text-on-dark rtl"
      :style="$q.screen.gt.sm ? 'padding-left: 38px; padding-right: 38px;' : 'padding-left: 24px; padding-right: 24px;'"
    >
      <div class="col-3">
        <div class="row items-center justify-between">
          <q-btn
            class="no-padding"
            flat
            @click="$router.go(-1)"
          >
            <q-icon
              name="arrow_back"
              size="sm"
            />
          </q-btn>

          <!-- <span
            v-if="selectedRowCount"
            class="text-on-dark text-body1 text-bold"
          >
            {{ selectedRowCount }}
          </span> -->
        </div>
      </div>
      <div class="col">

        <div class="row justify-end items-center">
          <!-- v-if="!tableStore.state.activeRow?.value" -->
          <div class="row items-center">
            <q-btn
              rounded
              outline
              dense
              unelevated
              class="q-px-sm q-py-xs bg-dark text-on-dark text-caption-sm text-bold no-pointer-events"
            >
              {{ tableStore?.pagination.value.totalItems }}
            </q-btn>
            <span
              class="q-mr-sm"
              :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'"
            >{{ title }}</span>
          </div>

          <!-- v-if="tableStore.state.activeRow?.value" -->
          <!-- <div
            class="row items-center q-gutter-x-sm"
          >
            <q-btn
              round
              dense
              unelevated
            >
              <q-icon name="more_horiz" />

              <q-menu cover>
                <q-list
                  dense
                  padding
                  style="width:200px"
                >
                  <q-item
                    clickable
                    v-close-popup
                    tabindex="0"
                  >
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar
                          class="bg-on-dark"
                          size="sm"
                        ><q-icon
                            name="o_refresh"
                            size="14px"
                          /></q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-caption">تازه‌سازی</div>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    clickable
                    v-close-popup
                    tabindex="0"
                  >
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar
                          class="bg-on-dark"
                          size="sm"
                        ><q-icon
                            name="o_close"
                            size="14px"
                          /></q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-caption">غیر‌فعال‌سازی</div>
                    </q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    tabindex="0"
                  >
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar
                          class="bg-on-dark"
                          size="sm"
                        ><q-icon
                            name="o_check"
                            size="14px"
                          /></q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-caption">فعال سازی</div>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    clickable
                    v-close-popup
                    tabindex="0"
                  >
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar
                          class="bg-on-dark"
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
            <q-btn
              dense
              round
              flat
            >
              <q-icon
                name="o_delete"
                size="sm"
              />
            </q-btn>

            <q-btn
              dense
              round
              flat
            >
              <q-icon
                name="o_edit"
                size="sm"
              />
            </q-btn>

          </div> -->

        </div>

      </div>

    </q-toolbar>
  </q-page-sticky>
  <!-- <div class="text-body1 no-letter-spacing">
    {{ title }}
    <q-badge
      v-if="tableStore?.pagination.value.totalItems > 0"
      align="top"
      color="blue"
    >
      {{ tableStore?.pagination.value.totalItems }}
    </q-badge>
  </div> -->

  <div class="q-mt-xl">
    <data-grid
      ref="dataGrid"
      dataSource="cmn/product/getGridData"
      createUrl="/cmn/product/create"
      :grid-store="gridStore"
      multiSelect
      numbered
    >
      <template #body="{ item }">
        <q-card class="bordered">
          <q-card-section>
            <div class="row justify-between items-center">

              <div class="col-8 row items-center">
                <span class="text-caption text-on-dark">{{ item.productGroupTitle }}</span>
              </div>

              <div class="col row justify-end items-center q-gutter-xs">
                <span class="text-caption text-on-dark">{{ item.code }}</span>
              </div>

            </div>
            <q-separator class="q-mt-xs" />

            <div class="column q-gutter-sm q-my-md">

              <div class="row items-center border-radius-sm">

                <div class="col-3">
                  <span class="text-caption text-on-dark">عنوان</span>
                </div>

                <div class="col">
                  <span class="ellipsis-2-lines text-caption text-bold text-on-dark">{{ item.title }}</span>
                </div>
              </div>

              <div class="row">

                <div class="col-3">
                  <span class="text-caption text-on-dark">وضعیت</span>
                </div>

                <div class="col">
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
                </div>

              </div>

            </div>

          </q-card-section>

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

          <q-item-section class="text-body2 no-letter-spacing">
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

          <q-item-section class="text-body2 no-letter-spacing">
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
import RowToolBar from "src/components/shared/RowToolBar.vue"
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

// const selectedRowCount = computed(() => {
//   return tableStore.value.state.allSelectedIds.value.length
// })

</script>
