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
    <q-card class="q-pa-sm">
      <q-card-section>
        <q-input
          class="no-pointer-events"
          outlined
          dense
          rounded
          @click="showSearchModal"
          placeholder="جستجو در فاکتورها"
        >
          <template #prepend>
            <q-icon name="o_search" />
          </template>

          <template #append>
            <q-btn
              dense
              flat
              icon="close"
              v-close-popup
              class="all-pointer-events"
            />
          </template>
        </q-input>


      </q-card-section>

      <q-card-section class="q-pt-sm q-pb-none">
        <q-scroll-area
          :thumb-style="{ opacity: 0 }"
          :bar-style="{ opacity: 0 }"
          style="height: 60px;"
          class="no-scroll"
        >
          <div>
            <div class="row items-center q-gutter-md no-wrap">

              <q-btn
                rounded
                unelevated
                padding="8px 12px"
                :color="activeBtn ? 'primary' : ''"
                :text-color="!activeBtn ? 'grey-10' : 'white'"
                class="text-on-dark text-body2"
                :class="!activeBtn ? 'bordered-btn' : ''"
                @click="makeBtnActive"
                style="min-width: 60px;"
              >
                <span>{{ $t("shared.labels.all") }}</span>
              </q-btn>

              <q-btn
                rounded
                unelevated
                padding="8px 12px"
                :color="activeBtn ? 'primary' : ''"
                :text-color="!activeBtn ? 'grey-10' : 'white'"
                class="text-on-dark text-body2"
                :class="!activeBtn ? 'bordered-btn' : ''"
                @click="makeBtnActive"
                style="min-width: 60px;"
              >
                <span>{{ $t("shared.labels.today") }}</span>
              </q-btn>

              <q-btn
                rounded
                unelevated
                padding="8px 12px"
                :color="activeBtn ? 'primary' : ''"
                :text-color="!activeBtn ? 'grey-10' : 'white'"
                class="text-on-dark text-body2"
                :class="!activeBtn ? 'bordered-btn' : ''"
                @click="makeBtnActive"
                style="min-width: 80px;"
              >
                <span>{{ $t("shared.labels.thisWeek") }}</span>
              </q-btn>

              <q-btn
                rounded
                unelevated
                padding="8px 12px"
                :color="activeBtn ? 'primary' : ''"
                :text-color="!activeBtn ? 'grey-10' : 'white'"
                class="text-on-dark text-body2"
                :class="!activeBtn ? 'bordered-btn' : ''"
                @click="makeBtnActive"
                style="min-width: 70px;"
              >
                <span>{{ $t("shared.labels.thisMonth") }}</span>
              </q-btn>

              <q-btn
                rounded
                unelevated
                padding="8px 12px"
                class="bordered-btn text-on-dark text-body2"
                @click="openDateModal"
                style="min-width: 84px;"
              >
                <span>مبلغ</span>
                <q-icon
                  size="xs"
                  class="q-ml-sm"
                  name="o_expand_more"
                />
              </q-btn>
              <q-btn
                rounded
                unelevated
                padding="8px 12px"
                class="bordered-btn text-on-dark text-body2"
                @click="openDateModal"
                style="min-width: 84px;"
              >
                <span>تاریخ</span>
                <q-icon
                  size="xs"
                  class="q-ml-sm"
                  name="o_expand_more"
                />
              </q-btn>
              <q-btn
                rounded
                unelevated
                padding="8px 12px"
                class="bordered-btn text-on-dark text-body2"
                @click="openDateModal"
                style="min-width: 84px;"
              >
                <span>شرح</span>
                <q-icon
                  size="xs"
                  class="q-ml-sm"
                  name="o_expand_more"
                />
              </q-btn>
            </div>

          </div>
        </q-scroll-area>
      </q-card-section>

      <q-card-section class="column q-col-gutter-md q-pt-none">
        <div class="row q-col-gutter-sm">
          <div class="col">
            <q-item-label
              caption
              class="q-mb-sm"
            >
              شماره
            </q-item-label>
            <q-input
              outlined
              dense
            />
          </div>
          <div class="col">
            <q-item-label
              caption
              class="q-mb-sm"
            >
              تاریخ
            </q-item-label>
            <q-input
              outlined
              dense
            />
          </div>
        </div>

        <div>
          <q-item-label
            caption
            class="q-mb-sm"
          >
            مشتری
          </q-item-label>
          <q-input
            outlined
            dense
          />
        </div>

        <div>
          <q-item-label
            caption
            class="q-mb-sm"
          >
            شرح
          </q-item-label>
          <q-input
            outlined
            dense
          />
        </div>

        <div class="row q-col-gutter-sm">
          <div class="col">
            <q-item-label
              caption
              class="q-mb-sm"
            >
              جمع کل
            </q-item-label>
            <q-input
              outlined
              dense
            />
          </div>
          <div class="col">
            <q-item-label
              caption
              class="q-mb-sm"
            >
              تخفیف
            </q-item-label>
            <q-input
              outlined
              dense
            />
          </div>


        </div>

        <div class="row q-col-gutter-sm">
          <div class="col">
            <q-item-label
              caption
              class="q-mb-sm"
            >
              نوع
            </q-item-label>
            <q-input
              outlined
              dense
            />
          </div>
          <div class="col">
            <q-item-label
              caption
              class="q-mb-sm"
            >
              وضعیت
            </q-item-label>
            <q-input
              outlined
              dense
            >
              <template #append>
                <q-icon name="expand_more" />
              </template>
            </q-input>
          </div>


        </div>

      </q-card-section>


      <div class="row absolute-bottom q-mb-xl q-mx-lg">

        <q-btn
          padding="10px 12px"
          rounded
          unelevated
          outline
          class="q-mb-sm full-width"
        >
          <div class="row items-center">
            <q-icon
              size="xs"
              name="o_close"
              class="q-mr-xs"
            />
            <span>
              حذف فیلتر
            </span>
          </div>
        </q-btn>

        <q-btn
          padding="10px 12px"
          rounded
          unelevated
          color="primary"
          class="q-mb-sm full-width"
        >
          <div class="row items-center">
            <q-icon
              size="xs"
              name="o_search"
              class="q-mr-xs"
            />
            <span>
              جستجو
            </span>
          </div>
        </q-btn>

      </div>

    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue"
import ToolBar from "src/components/shared/ToolBar.vue"
import AdvancedSearch from "src/components/areas/sls/invoice/_AdvancedSearch.vue"
import DataGrid from "src/components/shared/DataTables/mobile/DataGrid.vue"
import { useInvoice } from "src/components/areas/sls/_composables/useInvoice"
import { sqlOperator } from "src/constants"
import { helper } from "src/helpers"

const invoiceStore = useInvoice()

const dialog = ref(false)
const showIcon = ref(true)

const activeBtn = ref(false)

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


const handleScroll = () => {
  const threshold = 50
  const currentPosition = window.pageYOffset || document.documentElement.scrollTop
  showIcon.value = currentPosition < threshold
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const showSearchModal = () => {
  dialog.value = true
}

const makeBtnActive = () => {
  activeBtn.value = !activeBtn.value
}

</script>

<style lang="scss" scoped>.q-item__label--caption {
  font-size: 14px;
  letter-spacing: 0;
  color: #697588;
}</style>
