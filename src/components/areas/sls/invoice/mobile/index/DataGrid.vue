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
            class="row items-center"
            v-if="!invoiceStore.state.activeRow?.value"
          >
            <q-btn
              rounded
              outline
              dense
              unelevated
              class="q-px-sm q-py-xs bg-dark text-on-dark text-caption-sm text-bold no-pointer-events"
            >
              {{ invoiceStore?.pagination.value.totalItems }}
            </q-btn>
            <span
              class="q-mr-sm"
              :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'"
            >فاکتورهای فروش</span>
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

          </div>

        </div>

      </div>

    </q-toolbar>
  </q-page-sticky>

  <q-page-sticky
    position="bottom-right z-1"
    :offset="[18, 18]"
  >
    <q-btn
      v-if="showCreate"
      rounded
      padding="10px 20px"
      to="/sls/invoice/create"
      dense
      color="primary"
      class="text-body1 no-letter-spacing primary-shadow"
    >
      <div class="row items-center q-gutter-x-xs">
        <q-icon
          name="o_add"
          size="sm"
        />
        <span>
          {{ $t("shared.labels.create") }}
        </span>
      </div>
    </q-btn>

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
              <div class="text-bold text-white text-caption">{{
                invoiceStore.state?.summaryData?.value?.amount.toLocaleString() }}</div>
            </div>

            <div class="row q-gutter-sm q-pt-xs">
              <div class="text-caption text-bold text-blue-3">جمع تخفیف‌ها</div>
              <div class="text-bold text-white text-caption">{{
                invoiceStore.state?.summaryData?.value?.discountAmount.toLocaleString() }}</div>
            </div>
          </div>
        </div>

      </q-card-section>
    </q-card>

    <q-card
      class="bordered bg-blue-grey-2"
      v-if="selectedRowCount > 1"
    >
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
              <div class="text-bold text-grey-10 text-caption">{{ amount.toLocaleString() }}</div>
            </div>

            <div class="row q-gutter-sm q-pt-xs">
              <div class="text-caption text-bold text-grey-7">جمع تخفیف‌ها</div>
              <div class="text-bold text-grey-10 text-caption">{{ discountAmount.toLocaleString() }}</div>
            </div>
          </div>
        </div>

      </q-card-section>

    </q-card>

  </div>

  <div class="column q-mt-md q-gutter-lg">
    <q-input
      outlined
      readonly
      dense
      rounded
      @click="showSearchModal"
      placeholder="جستجو در فاکتورها"
    >
      <template #prepend>
        <q-icon name="o_search" />
      </template>
    </q-input>

    <div
      class="row items-center justify-center text-body1 no-letter-spacing"
      v-if="selectedDateRange.label && shouldDisplaySelectedDateRange"
    >
      <q-btn
        @click="clearDateRangeFilter"
        size="xs"
        class="q-mr-sm"
        round
        unelevated
        dense
        icon="o_close"
        color="primary"
      />
      <span>
        نتایج جستجو برای: {{ selectedDateRange.label }}
      </span>
    </div>

    <data-grid
      data-source="sls/invoice/getGridData"
      :grid-store="invoiceStore"
      ref="invoiceTable"
    >
      <template #header>
        <template></template>
      </template>

      <template #body="{ item }">
        <q-card
          class="bordered"
          :class="tableStore?.getRowClass(item)"
          v-touch-hold.mouse="() => selectCard(item)"
        >
          <q-card-section class="q-pb-none">
            <div class="row items-center justify-center">
              <q-btn
                v-if="!item.selected"
                round
                unelevated
                class="no-pointer-events"
              >
                <q-avatar
                  v-if="item.avatar"
                  size="56px"
                  :style="{ backgroundColor: helper.generateDarkAvatarColor(item.customerName) }"
                >
                  <img src="https://cdn.quasar.dev/img/avatar1.jpg">
                </q-avatar>

                <q-avatar
                  size="56px"
                  text-color="white"
                  :style="{ backgroundColor: helper.generateDarkAvatarColor(item.customerName) }"
                  v-else
                >
                  <div class="char text-body1 text-bold">
                    {{ helper.getFirstChar(item.customerName) }}
                  </div>
                </q-avatar>
              </q-btn>

              <q-btn
                round
                unelevated
                class="no-pointer-events"
                v-if="item.selected"
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
                <span class="text-caption text-on-dark">{{ item.dateString }}</span>
              </div>

              <div class="col row justify-end items-center q-gutter-xs">
                <span class="text-caption text-on-dark">
                  شماره
                </span>
                <span class="text-caption text-on-dark">{{ item.no }}</span>
              </div>
            </div>
            <q-separator class="q-mt-xs" />

            <div class="column q-gutter-sm q-my-md">

              <div class="row items-center border-radius-sm q-px-sm">

                <div class="col-3">
                  <span class="text-caption text-on-dark">مشتری</span>
                </div>
                <div class="col">
                  <span class="ellipsis-2-lines text-caption text-bold text-on-dark">{{ item.customerName }}</span>
                </div>
              </div>

              <div class="row items-center border-radius-sm q-px-sm">
                <div class="col-3">
                  <span class="text-caption text-on-dark">شرح</span>
                </div>
                <div class="col">
                  <span class="ellipsis-2-lines text-caption text-on-dark">{{ item.subject }}</span>
                </div>
              </div>

              <div class="row items-center border-radius-sm q-px-sm">
                <div class="col-3">
                  <span class="text-caption text-on-dark">تخفیف</span>
                </div>
                <div class="col">
                  <span
                    class="ellipsis-2-lines text-caption text-on-dark">{{ item.discountAmount.toLocaleString() }}</span>
                </div>
              </div>

              <div class="row items-center border-radius-sm q-px-sm">

                <div class="col-3">
                  <span class="text-caption text-on-dark">جمع کل</span>
                </div>
                <div class="col">
                  <span
                    class="ellipsis-2-lines text-caption text-bold text-on-dark">{{ item.amount.toLocaleString() }}</span>
                </div>
              </div>
            </div>

            <div class="row q-gutter-sm items-center">
              <q-btn
                dense
                padding="2px 12px"
                class="border-radius-sm bg-orange-2 no-pointer-events"
                unelevated
              >
                <span class="text-caption text-red">
                  {{ item.statusTitle }}
                </span>
              </q-btn>

              <q-btn
                dense
                padding="2px 12px"
                class="border-radius-sm bg-primary no-pointer-events"
                unelevated
              >
                <span class="text-caption text-white">
                  {{ item.typeTitle }}
                </span>
              </q-btn>

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
    </data-grid>
  </div>

  <bottom-sheet
    v-if="bottomSheetStatus"
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >

    <template #header>

    </template>

    <template #body>
      <q-list padding>

        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_copy"
            />
          </q-item-section>

          <q-item-section class="text-body1 no-letter-spacing">کپی</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_edit"
            />
          </q-item-section>

          <q-item-section class="text-body1 no-letter-spacing">ویرایش</q-item-section>
        </q-item>

        <q-separator size="1px" />

        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_email"
            />
          </q-item-section>

          <q-item-section class="text-body1 no-letter-spacing">ارسال ایمیل</q-item-section>
        </q-item>

        <q-separator size="0.5px" />

        <q-item
          clickable
          v-ripple
          @click="showPrintDialog"
        >
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_print"
            />
          </q-item-section>

          <q-item-section class="text-body1 no-letter-spacing">چاپ</q-item-section>
        </q-item>

        <q-separator />

        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              icon="o_delete"
            />
          </q-item-section>

          <q-item-section class="text-body1 no-letter-spacing">حذف</q-item-section>
        </q-item>

      </q-list>
    </template>

  </bottom-sheet>

  <q-dialog
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    v-model="printDialog"
  >
    <q-card class="q-mt-xl">
      <q-card-section>
        <div class="row items-center justify-between">
          <span class="text-body1 no-letter-spacing">چاپ</span>
          <q-btn
            round
            unelevated
            icon="o_close"
            v-close-popup
          />
        </div>
      </q-card-section>

      <q-card-section class="no-padding">

        <q-list padding>

          <q-item
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_print"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">چاپ مستقیم</q-item-section>
          </q-item>

          <q-separator />

          <q-item
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_crop_portrait"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">پی دی اف - A4</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_crop_landscape"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">پی دی اف - A4 - افقی</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_crop_portrait"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">پی دی اف - A5</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_crop_landscape"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">پی دی اف - A5 - افقی</q-item-section>
          </q-item>

          <q-separator />

          <q-item
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_contact_mail"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">چاپ برچسب نشانی</q-item-section>
          </q-item>


        </q-list>

      </q-card-section>
    </q-card>

  </q-dialog>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue"

import { useInvoiceGrid } from "components/areas/sls/_composables/useInvoiceGrid"
import { sqlOperator } from "src/constants"
import { helper } from "src/helpers"

import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue"
import BottomSheet from "src/components/shared/BottomSheet.vue"

const invoiceStore = useInvoiceGrid([{
  fieldName: "d.StatusId",
  operator: sqlOperator.notEqual,
  value: "a36af633-d0bb-4857-a542-364e12658d1c"
}])

const canceledInvoiceStore = useInvoiceGrid([{
  fieldName: "d.StatusId",
  operator: sqlOperator.equal,
  value: "a36af633-d0bb-4857-a542-364e12658d1c"
}])

const invoiceTable = ref(null)
const tableStore = computed(() => invoiceTable.value?.tableStore)

const dialog = ref(false)
const showCreate = ref(true)
const advancedSearch = ref(null)

const bottomSheetStatus = ref(false)
const printDialog = ref(false)

const selectedDateRange = ref({ value: "", label: "" });

const selectedRowCount = computed(() => {
  return invoiceStore.state.allSelectedIds.value.length
})

const amount = computed(() => {
  const selectedRows = invoiceStore.state.rows.value.filter(row =>
    invoiceStore.state.allSelectedIds.value.includes(row.id)
  );
  return selectedRows.reduce((total, row) => total + row.amount, 0);
});

const discountAmount = computed(() => {
  const selectedRows = invoiceStore.state.rows.value.filter(row =>
    invoiceStore.state.allSelectedIds.value.includes(row.id)
  );
  return selectedRows.reduce((total, row) => total + row.discountAmount, 0);
});

const showSearchModal = () => {
  dialog.value = true
}

async function applySearch(model) {
  await invoiceTable.value.loadData()
  dialog.value = false
}

const shouldDisplaySelectedDateRange = computed(() => {
  return selectedDateRange.value.value !== 'all' && selectedDateRange.value.value !== 0 && selectedDateRange.value.label !== 'shared.labels.0';
});

const clearDateRangeFilter = () => {
  selectedDateRange.value = { value: '', label: '' };
  invoiceStore.setDefaultSearchModel();
  applySearch();
};

function selectRow(row, checked) {
  tableStore.value.selectRow(row, checked)
  emitselectedRows()
}

function emitselectedRows() {
  // emit("selected-rows-changed", tableStore.selectedRows.value)
}

function setActiveRow(row) {
  tableStore.value.setActiveRow(row)
}

function selectCard(row) {
  setActiveRow(row)
  selectRow(row, !row.selected)
}

const onBottomSheetShow = (row) => {
  bottomSheetStatus.value = true;
}

const onBottomSheetHide = () => {
  bottomSheetStatus.value = false;
}
</script>

<style lang="scss" scoped>
.q-item__label--caption {
  font-size: 14px;
  letter-spacing: 0;
  color: #697588;
}
</style>
