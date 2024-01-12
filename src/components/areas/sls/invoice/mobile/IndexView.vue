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
            <span class="q-mr-sm" :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'">فاکتورهای فروش</span>
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

          </div>

        </div>

      </div>

    </q-toolbar>
  </q-page-sticky>

  <q-page-sticky
    position="bottom-left z-1"
    :offset="[18, 18]"
  >
    <q-btn
      :round="!showIcon"
      :rounded="showIcon"
      :padding="showIcon ? '10px 20px' : '10px'"
      to="/sls/invoice/create"
      dense
      color="primary"
      class="text-body1 no-letter-spacing"
    >
      <div class="row items-center q-gutter-x-xs">
        <q-icon
          name="o_add"
          size="sm"
        />
        <span v-if="showIcon">
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

  <div class="colunm q-mt-md q-gutter-lg">
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

    <div v-if="selectedDateRange.label && shouldDisplaySelectedDateRange" class="text-body1 no-letter-spacing text-center">
      نتایج جستجو برای: {{ selectedDateRange.label }}
    </div>

    <data-grid
      data-source="sls/invoice/getGridData"
      :grid-store="invoiceStore"
      ref="invoiceTable"
    />
  </div>

  <q-dialog
    v-model="dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >

    <advanced-search
      :grid-store="invoiceStore"
      @apply-search="applySearch"
      @update-date-range="handleDateRangeUpdate"
    />

  </q-dialog>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue"
import { useI18n } from 'vue-i18n';

import { useInvoice } from "src/components/areas/sls/_composables/useInvoice"
import { sqlOperator } from "src/constants"

import AdvancedSearch from "src/components/areas/sls/invoice/mobile/_AdvancedSearch.vue"
import DataGrid from "src/components/shared/DataTables/mobile/DataGrid.vue"

const { t } = useI18n();

const invoiceStore = useInvoice([{
  fieldName: "d.StatusId",
  operator: sqlOperator.notEqual,
  value: "a36af633-d0bb-4857-a542-364e12658d1c"
}])

const canceledInvoiceStore = useInvoice([{
  fieldName: "d.StatusId",
  operator: sqlOperator.equal,
  value: "a36af633-d0bb-4857-a542-364e12658d1c"
}])

const invoiceTable = ref(null)
const tableStore = computed(() => invoiceTable.value?.tableStore)

const dialog = ref(false)
const showIcon = ref(true)
let previousScrollPosition = 0

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

const handleScroll = () => {
  const currentPosition = window.pageYOffset || document.documentElement.scrollTop;

  showIcon.value = currentPosition <= 0 || currentPosition < previousScrollPosition;

  previousScrollPosition = currentPosition;
};

const handleDateRangeUpdate = ({ value, label }) => {
  if (label !== 'all' && label !== 0) {
    selectedDateRange.value = { value, label };
  }
};

const shouldDisplaySelectedDateRange = computed(() => {
  return selectedDateRange.value.value !== 'all' && selectedDateRange.value.value !== 0 && selectedDateRange.value.label !== 'shared.labels.0';
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.q-item__label--caption {
  font-size: 14px;
  letter-spacing: 0;
  color: #697588;
}
</style>
