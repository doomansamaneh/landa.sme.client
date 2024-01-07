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

          <span
            v-if="selectedRowCount"
            class="text-on-dark text-body1 text-bold"
          >
            {{ selectedRowCount }}
          </span>
        </div>
      </div>
      <div class="col">

        <div class="row justify-end items-center">

          <div
            class="q-gutter-sm"
            v-if="!invoiceStore.state.activeRow?.value"
          >
            <q-btn
              round
              outline
              dense
              unelevated
              class="bg-dark text-on-dark text-caption text-bold no-pointer-events"
            >
              {{ invoiceStore?.pagination.value.totalItems }}
            </q-btn>
            <span :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'">فاکتورهای فروش</span>
          </div>

          <div
            v-if="invoiceStore.state.activeRow?.value"
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
                          class="dark-icon"
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
                          class="dark-icon"
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
                          class="dark-icon"
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

            <q-btn
              dense
              round
              flat
            >
              <q-icon
                name="o_add"
                size="sm"
              />
            </q-btn>


          </div>

        </div>

      </div>

    </q-toolbar>
  </q-page-sticky>

  <div
    class="column q-gutter-sm"
    style="margin-top: 46px;"
  >

    <q-card class="bordered bg-primary">
      <q-card-section>

        <div class="row items-center q-gutter-sm">
          <div class="col-2">

            <q-btn
              round
              dense
              unelevated
              class="bg-white text-primary text-body1 text-bold no-pointer-events"
            >
              {{ invoiceStore?.pagination.value.totalItems }}
            </q-btn>

          </div>
          <div class="col">
            <div class="row q-gutter-sm">
              <div class="text-caption text-bold text-blue-3">جمع کل</div>
              <div class="text-bold text-white text-caption">729,679,649,000</div>
            </div>

            <div class="row q-gutter-sm q-pt-xs">
              <div class="text-caption text-bold text-blue-3">جمع تخفیف‌ها</div>
              <div class="text-bold text-white text-caption">122,21,429,000</div>
            </div>
          </div>
        </div>

      </q-card-section>
    </q-card>

    <q-card class="bordered bg-blue-grey-2">
      <q-card-section>

        <div class="row items-center q-gutter-sm">
          <div class="col-2">

            <q-btn
              round
              dense
              unelevated
              class="bg-white text-primary text-body1 text-bold no-pointer-events"
            >
              <q-icon
                size="28px"
                name="o_done"
              />
            </q-btn>

          </div>
          <div class="col">
            <div class="row q-gutter-sm">
              <div class="text-caption text-bold text-grey-7">جمع کل</div>
              <div class="text-bold text-grey-10 text-caption">729,679,649,000</div>
            </div>

            <div class="row q-gutter-sm q-pt-xs">
              <div class="text-caption text-bold text-grey-7">جمع تخفیف‌ها</div>
              <div class="text-bold text-grey-10 text-caption">122,21,429,000</div>
            </div>
          </div>
        </div>

      </q-card-section>

    </q-card>

  </div>

  <div class="colunm q-mt-md q-gutter-lg">
    <q-input
      outlined
      dense
      rounded
      @click="showSearchModal"
      placeholder="جستجو در فاکتورها"
    >
      <template #prepend>
        <q-icon name="o_search" />
      </template>
    </q-input>

    <data-grid
      data-source="sls/invoice/getGridData"
      :store="invoiceStore"
    />
  </div>

  <q-dialog
    v-model="dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-primary text-white">
      <q-bar>
        <q-space />

        <q-btn
          dense
          flat
          icon="minimize"
          @click="maximizedToggle = false"
          :disable="!maximizedToggle"
        >
          <q-tooltip
            v-if="maximizedToggle"
            class="bg-white text-primary"
          >Minimize</q-tooltip>
        </q-btn>
        <q-btn
          dense
          flat
          icon="crop_square"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
          <q-tooltip
            v-if="!maximizedToggle"
            class="bg-white text-primary"
          >Maximize</q-tooltip>
        </q-btn>
        <q-btn
          dense
          flat
          icon="close"
          v-close-popup
        >
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro.
        Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue"
import ToolBar from "src/components/shared/ToolBar.vue"
import DataGrid from "src/components/shared/DataTables/mobile/DataGrid.vue"
import { useInvoice } from "src/components/areas/sls/_composables/useInvoice"
import { sqlOperator } from "src/constants"
import { helper } from "src/helpers"

const invoiceStore = useInvoice()

const dataTable = ref(null)

const dialog = ref(false)

// const activeRowCount = computed(() => {
//   return invoiceStore.state.activeRow.value ? invoiceStore.state.activeRow.value.length : 0
// })

const selectedRowCount = computed(() => {
  return invoiceStore.state.allSelectedIds.value.length
})

const showDiscount = computed(() =>
  dataTable.value?.tableStore?.columns.value.findIndex(column => column.name === "discountAmount") >= 0
)

const showSearchModal = () => {
  dialog.value = true
}
</script>
