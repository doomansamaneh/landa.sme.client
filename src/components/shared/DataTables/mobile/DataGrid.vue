<template>
  <q-card
    class="bordered"
    v-for="(row, index) in invoiceStore.state.rows.value"
    :key="index"
    :class="tableStore.getRowClass(row)"
    v-touch-hold.mouse="() => selectCard(row)"
  >
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-center">
        <q-btn
          v-if="!row.selected"
          round
          unelevated
          class="no-pointer-events"
        >
          <q-avatar
            v-if="row.avatar"
            size="56px"
            :style="{ backgroundColor: helper.generateDarkAvatarColor(row.customerName) }"
          >
            <img src="https://cdn.quasar.dev/img/avatar1.jpg">
          </q-avatar>

          <q-avatar
            size="56px"
            text-color="white"
            :style="{ backgroundColor: helper.generateDarkAvatarColor(row.customerName) }"
            v-else
          >
            <div class="char text-body1 text-bold">
              {{ helper.getFirstChar(row.customerName) }}
            </div>
          </q-avatar>

        </q-btn>

        <q-btn
          round
          unelevated
          class="no-pointer-events"
          v-if="row.selected"
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
          <span class="text-caption text-on-dark">{{ row.dateString }}</span>
        </div>

        <div class="col row justify-end items-center q-gutter-xs">
          <span class="text-caption text-on-dark">
            شماره
          </span>
          <span class="text-caption text-on-dark">{{ row.no }}</span>
        </div>
      </div>
      <q-separator class="q-mt-xs" />

      <div class="column q-gutter-sm q-my-md">

        <div class="row items-center border-radius-sm q-px-sm">

          <div class="col-3">
            <span class="text-caption text-on-dark">مشتری</span>
          </div>
          <div class="col">
            <span class="ellipsis-2-lines text-caption text-bold text-on-dark">{{ row.customerName }}</span>
          </div>
        </div>

        <div class="row items-center border-radius-sm q-px-sm">
          <div class="col-3">
            <span class="text-caption text-on-dark">شرح</span>
          </div>
          <div class="col">
            <span class="ellipsis-2-lines text-caption text-on-dark">{{ row.subject }}</span>
          </div>
        </div>

        <div class="row items-center border-radius-sm q-px-sm">
          <div class="col-3">
            <span class="text-caption text-on-dark">تخفیف</span>
          </div>
          <div class="col">
            <span class="ellipsis-2-lines text-caption text-on-dark">{{ row.discountAmount.toLocaleString() }}</span>
          </div>
        </div>

        <div class="row items-center border-radius-sm q-px-sm">

          <div class="col-3">
            <span class="text-caption text-on-dark">جمع کل</span>
          </div>
          <div class="col">
            <span class="ellipsis-2-lines text-caption text-bold text-on-dark">{{ row.amount.toLocaleString() }}</span>
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
            {{ row.statusTitle }}
          </span>
        </q-btn>

        <q-btn
          dense
          padding="2px 12px"
          class="border-radius-sm bg-primary no-pointer-events"
          unelevated
        >
          <span class="text-caption text-white">
            {{ row.typeTitle }}
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

  <div
    v-if="!tableStore.showLoader.value && tableStore.rows.value.length == 0"
    class="q-table__bottom items-center q-table__bottom--nodata"
  >
    <slot name="noDataFound">
      <no-data-found />
    </slot>
  </div>

  <div
    class="row justify-center"
    v-if="hasMoreData"
  >
    <q-btn
      rounded
      unelevated
      @click="gotoNext"
      class="full-width primary-shadow bg-primary text-white"
    >
      <span class="text-body3">بارگزاری بیشتر</span>
    </q-btn>
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
import { ref, onMounted, computed } from "vue"
import { useQuasar } from "quasar";
import NoDataFound from "src/components/shared/DataTables/NoDataFound.vue"
import bottomSheet from "src/components/shared/BottomSheet.vue"
import { useDataTable } from "src/composables/useDataTable";
import { useInvoice } from "src/components/areas/crm/_composables/useInvoice"
import { helper } from "src/helpers"

const props = defineProps({
  gridStore: Object,
  dataSource: String
})

const $q = useQuasar()
const invoiceStore = useInvoice()
const tableStore = useDataTable(props.dataSource, props.gridStore.columns, props.gridStore)

const bottomSheetStatus = ref(false)
const printDialog = ref(false)

function selectRow(row, checked) {
  tableStore.selectRow(row, checked)
  emitselectedRows()
}

function emitselectedRows() {
  // emit("selected-rows-changed", tableStore.selectedRows.value)
}

function setActiveRow(row) {
  tableStore.setActiveRow(row)
  // emit("active-row-changed", row)
}

function selectCard(row) {

  setActiveRow(row)
  selectRow(row, !row.selected)
}

async function gotoNext() {
  if (hasMoreData.value) {
    tableStore.pagination.value.currentPage++
    await reloadData()
  }
}

async function reloadData() {
  await tableStore.reloadData()
  invoiceStore.state.rows.value = [...invoiceStore.state.rows.value, ...tableStore.rows.value]
}

async function loadData() {
  tableStore.pagination.value.currentPage = 1
  await tableStore.reloadData()
  invoiceStore.state.rows.value = tableStore.rows.value
}

const hasMoreData = computed(() => {
  return tableStore.pagination.value.currentPage < tableStore.pagination.value.totalPages
});


// function showTools(grid) {
//   $q.bottomSheet({
//     grid,
//     actions: [
//       {
//         label: 'کپی',
//         icon: 'o_copy',
//         id: 'copy'
//       },
//       {
//         label: 'ویرایش',
//         icon: 'o_edit',
//         id: 'edit'
//       },
//       {},
//       {
//         label: 'ارسال ایمیل',
//         icon: 'o_email',
//         id: 'send-as-email'
//       },
//       {},
//       {
//         label: 'چاپ مستقیم',
//         icon: 'o_print',
//         id: 'print-directly'
//       },
//       {
//         label: 'پی دی اف - A4',
//         icon: 'o_crop_portrait',
//         id: 'print-a4'
//       },
//       {
//         label: 'پی دی اف - A4 - افقی',
//         icon: 'o_crop_portrait',
//         id: 'print-a4-landscape'
//       },
//       {
//         label: 'پی دی اف - A5',
//         icon: 'o_crop_landscape',
//         id: 'print-a5'
//       },
//       {
//         label: 'پی دی اف - A5 - افقی',
//         icon: 'o_crop_landscape',
//         id: 'print-a5-landscape'
//       },
//       {
//         label: 'چاپ برچسب نشانی',
//         icon: 'o_contact_mail',
//         id: 'print-address-sticky'
//       },
//       {},
//       {
//         label: 'حذف',
//         icon: 'o_delete',
//         id: 'delete'
//       },
//     ]
//   }).onOk(action => {
//     // console.log('Action chosen:', action.id)
//   }).onCancel(() => {
//     // console.log('Dismissed')
//   }).onDismiss(() => {
//     // console.log('I am triggered on both OK and Cancel')
//   })
// }

const onBottomSheetShow = () => {
  bottomSheetStatus.value = true
}

const onBottomSheetHide = () => {
  bottomSheetStatus.value = false;
}

const showPrintDialog = () => {
  printDialog.value = true;
}

onMounted(() => {
  loadData()
})

defineExpose({
  loadData,
  tableStore
})

</script>

<style lang="scss" scoped></style>

